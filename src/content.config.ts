import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Long-form legal pages, one Markdown file per locale:
//   src/content/legal/fr/privacy.md  ->  id "fr/privacy"
//   src/content/legal/en/privacy.md  ->  id "en/privacy"
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updated: z.string().optional(),
  }),
});

export const collections = { legal };
