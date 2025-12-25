import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { blogSchema } from 'starlight-blog/schema';
import { normalizeApiReferenceLink } from '../utils/normalizeApiReferenceLink';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
  apiReference: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: './src/content/api-reference',
      generateId: (options) => {
        // Remove the file extension
        const slug = `/${normalizeApiReferenceLink(options.entry)}`;
        return slug;
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
