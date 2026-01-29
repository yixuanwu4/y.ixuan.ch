import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  schema: z.object({
    displayName: z.string(),
    displayTime: z.string().optional(),
    displayLink: z.string().optional(),
    displaySkills: z.array(z.string()).optional(),
    date: z.string()
  }),
});

const projects = defineCollection({
  schema: z.object({
    displayName: z.string(),
    displayImg: z.string(),
    displayLink: z.string(),
    displaySkills: z.array(z.string()).optional(),
    date: z.string()
  }),
});

export const collections = {experience, projects};