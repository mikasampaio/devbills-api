import { z } from "zod";

export const categorySchema = z.object({
    title: z.string(),
    color: z.string().regex(/^#[A-Fa-f0-9]{6}$/)
})

export type CreateCategoryDTO = z.infer<typeof categorySchema>