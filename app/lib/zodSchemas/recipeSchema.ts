import { z } from "zod";

export const localRecipeSchema = z.object({
  // -int to prevent clashes with db ids
  id: z.number().int(),
  name: z.string().trim().min(1).max(256),
  description: z.string().trim(),
  types: z.array(z.string().trim()),
  time: z.number().int().min(1),
  feeds: z.number().int().min(1),
  requirements: z.array(z.string().trim()),
  ingredients: z.array(z.string().trim()),
  preNotes: z.string().trim(),
  steps: z.array(z.string().trim()),
  postNotes: z.string().trim(),
});

export const addLocalRecipeSchema = z.object({
  // -int to prevent clashes with db ids
  id: z.number().int().max(-1),
  name: z.string().trim().min(1).max(256),
  description: z.string().trim().optional(),
  types: z.array(z.string().trim()),
  time: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
  feeds: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
  requirements: z.array(z.string().trim()),
  ingredients: z.array(z.string().trim()),
  preNotes: z.string().trim().optional(),
  steps: z.array(z.string().trim()),
  postNotes: z.string().trim().optional(),
});

export const recipeArraySchema = z.array(localRecipeSchema);
