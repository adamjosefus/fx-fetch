import starlight from '@astrojs/starlight';
import { pluginLineNumbers as expressiveCodeLineNumbers } from '@expressive-code/plugin-line-numbers';
import { defineConfig } from 'astro/config';
import expressiveCodeTwoslash from 'expressive-code-twoslash';
import blog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
  base: import.meta.env.PROD ? '/fx-fetch' : undefined,
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'FxFetch',
      logo: {
        src: './public/logo_fx-fetch.svg',
      },
      customCss: ['@fontsource-variable/jetbrains-mono', './src/styles/custom.css'],
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
