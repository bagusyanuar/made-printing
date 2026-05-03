import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(255),
  description: z.string().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
