import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections as expressiveCodeCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers as expressiveCodeLineNumbers } from '@expressive-code/plugin-line-numbers';
import { defineConfig } from 'astro/config';
import expressiveCodeTwoslash from 'expressive-code-twoslash';
import blog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
  site: 'https://adamjosefus.github.io/fx-fetch/',
  base: import.meta.env.PROD ? '/fx-fetch' : undefined,
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'Fx-Fetch',
      logo: {
        src: './public/logo_fx-fetch.svg',
        replacesTitle: false,
      },
      customCss: ['@fontsource-variable/jetbrains-mono', './src/styles/custom.css'],
      markdown: {
        processedDirs: ['./src/content/api-reference'],
      },
      expressiveCode: {
        plugins: [
          expressiveCodeLineNumbers(),
          expressiveCodeCollapsibleSections(),
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
        {
          icon: 'npm',
          label: 'NPM',
          href: 'https://www.npmjs.com/package/fx-fetch',
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
            {
              label: 'Installation',
              slug: 'getting-started/installation',
            },
          ],
        },
        {
          label: 'Modules',
          items: [
            {
              label: 'Request',
              // items: [],
              slug: 'request',
            },
            {
              label: 'Fetch',
              // items: [],
              slug: 'fetch',
            },
            {
              label: 'Response',
              // items: [],
              slug: 'response',
            },
            {
              label: 'Url',
              // items: [],
              slug: 'url',
            },
          ],
        },
        {
          label: 'Examples',
          collapsed: true,
          items: [
            {
              label: 'Basics',
              slug: 'examples/basics',
            },
            {
              label: 'Structured errors',
              slug: 'examples/structured-errors',
            },
          ],
        },
        {
          label: 'API Reference',
          link: 'api-reference',
        },
      ],
      plugins: [
        blog({
          recentPostCount: 5,
          authors: {
            adamjosefus: {
              name: 'Adam Josefus',
              title: 'Author & Developer',
              picture: '/authors/adamjosefus.jpg',
              url: 'https://github.com/adamjosefus',
            },
          },
        }),
      ],
    }),
  ],
});
