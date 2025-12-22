import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  apiReference: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: './src/content/api-reference',
      generateId: (options) => {
        return options.entry;
      },
    }),
    schema: z.object({
      id: z.unknown(),
      data: z.unknown(),
      body: z.unknown(),
      filePath: z.unknown(),
      digest: z.unknown(),
      rendered: z.unknown(),
      collection: z.unknown(),
    }),
  }),
};
