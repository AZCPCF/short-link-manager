"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { fail, type FormResult } from "@/lib/result";
import {
  signInFields,
  signInSchema,
  signUpFields,
  signUpSchema,
} from "@/lib/validations/auth";
import {
  toFieldErrors,
  VALIDATION_ERROR,
} from "@/lib/validations/field-errors";

export type SignUpResult = FormResult<null, (typeof signUpFields)[number]>;
export type SignInResult = FormResult<null, (typeof signInFields)[number]>;

export async function signUp(
  _prevState: SignUpResult | null,
  formData: FormData,
): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ...fail(VALIDATION_ERROR),
      fieldErrors: toFieldErrors(parsed.error, signUpFields),
    };
  }

  const { error } = await auth.signUp.email(parsed.data);
  if (error) {
    console.error("signUp failed", error);
    return fail("Could not create account. This email may already be in use.");
  }

  redirect("/dashboard");
}

export async function signIn(
  _prevState: SignInResult | null,
  formData: FormData,
): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ...fail(VALIDATION_ERROR),
      fieldErrors: toFieldErrors(parsed.error, signInFields),
    };
  }

  const { error } = await auth.signIn.email(parsed.data);
  if (error) {
    console.error("signIn failed", error);
    return fail("Invalid email or password.");
  }

  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  await auth.signOut();
  redirect("/login");
}
