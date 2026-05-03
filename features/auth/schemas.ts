import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(20, "Username maksimal 20 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = loginSchema.extend({
  // Tambahin field lain kalo nanti butuh (e.g. confirm password)
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
