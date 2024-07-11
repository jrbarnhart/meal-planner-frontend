import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().trim().email().max(254),
  password: z.string().trim(),
});
