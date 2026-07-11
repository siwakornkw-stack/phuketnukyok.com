import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('ภูเก็ตนักยก'),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(), // featured image path
    draft: z.boolean().default(false),
    slug: z.string().optional(), // written by the CMS; URL comes from filename
  }),
});

export const collections = { blog };
