import * as Bun from 'bun';
import * as NodePath from 'node:path';
import { pipe } from 'effect';
import typedocConfig from '../typedoc.json';
import { normalizeApiReferenceLink } from '../utils/normalizeApiReferenceLink';

console.log('🛠️ Building API References…');
console.log('');

const shellOutput = await Bun.$`pnpm exec typedoc --options ./typedoc.json`.nothrow();

if (shellOutput.exitCode !== 0) {
  console.error('Error building API reference:');
  console.error(shellOutput.stderr.toString());
  process.exit(shellOutput.exitCode);
}

console.log('');
console.log('✅ Typedoc build successful');
console.log('🛠️ Processing markdown files…');
console.log('');

const outputDir = pipe(typedocConfig.outputs, (outputs) => {
  if (!Array.isArray(outputs)) {
    console.log('⛔ Typedoc outputs configuration is not an array.');
    process.exit(1);
  }

  if (outputs.length !== 1) {
    console.log('⛔ Typedoc outputs configuration must contain exactly one output.');
    process.exit(1);
  }

  const output = outputs[0].path;
  return output;
});

const glob = new Bun.Glob('**/*.md');
const regex = /(?<before>\[.+?\]\()(?<link>.+?)(?<after>\))/gm;

async function processFile(path: string): Promise<void> {
  const file = Bun.file(path);
  const text = await file.text();

  regex.lastIndex = 0;
  const output = text.replace(regex, (match, p1, p2, p3) => {
    const before = p1;
    const prevLink = p2;
    const after = p3;

    const isRelative = !NodePath.isAbsolute(prevLink);
    const isMarkdown = prevLink.endsWith('.md');

    const isValidLink = isRelative && isMarkdown;
    if (!isValidLink) {
      return match;
    }

    const nextLink = `./${normalizeApiReferenceLink(prevLink)}`;

    const result = [before, nextLink, after].join('');
    return result;
  });

  await Bun.write(path, output);

  console.log(`• ${path} ✔︎`);
}

const queue: Promise<void>[] = [];

for await (const pathname of glob.scan(outputDir)) {
  const path = NodePath.join(outputDir, pathname);

  queue.push(processFile(path));
}

await Promise.all(queue);
console.log('');
console.log('✅ Markdown processing complete');
