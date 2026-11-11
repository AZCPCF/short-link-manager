import { z } from "zod";

import { errorKey } from "@/lib/errors";

export const signUpSchema = z.object({
  name: z.string().trim().min(1, errorKey("nameRequired")),
  email: z.email(errorKey("emailInvalid")),
  password: z.string().min(8, errorKey("passwordTooShort")),
});

export const signInSchema = z.object({
  email: z.email(errorKey("emailInvalid")),
  password: z.string().min(1, errorKey("passwordRequired")),
});

export const signInFields = ["email", "password"] as const;
export const signUpFields = ["name", "email", "password"] as const;
