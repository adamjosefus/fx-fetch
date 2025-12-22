import starlight from '@astrojs/starlight';
import { pluginLineNumbers as expressiveCodeLineNumbers } from '@expressive-code/plugin-line-numbers';
import { defineConfig } from 'astro/config';
import expressiveCodeTwoslash from 'expressive-code-twoslash';

// https://astro.build/config
export default defineConfig({
  site: 'https://fx-fetch.adamjosefus.com/fx-fetch',
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'FxFetch',
      markdown: {
        processedDirs: ['./src/content/api-reference'],
      },
      expressiveCode: {
        plugins: [
          expressiveCodeLineNumbers(),
          expressiveCodeTwoslash({
            explicitTrigger: true,
            includeJsDoc: true,
            allowNonStandardJsDocTags: false,
            languages: ['ts', 'tsx'],
            twoslashOptions: {
              compilerOptions: {
                lib: ['ESNext', 'DOM', 'DOM.Iterable', 'DOM.AsyncIterable'],
              },
            },
          }),
        ],
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/adamjosefus/fx-fetch',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Introduction',
              slug: 'getting-started/introduction',
            },
            {
              label: 'Why Fx-Fetch?',
              slug: 'getting-started/why-fx-fetch',
            },
          ],
        },
        {
          label: 'Request',
          // items: [],
          link: '/request',
        },
        {
          label: 'Fetch',
          // items: [],
          link: '/fetch',
        },
        {
          label: 'Response',
          // items: [],
          link: '/response',
        },
        {
          label: 'Url',
          // items: [],
          link: '/url',
        },
        {
          label: 'API Reference',
          link: '/api-reference/index.md',
        },
      ],
    }),
  ],
});
