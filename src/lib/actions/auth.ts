"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { fail, type Result } from "@/lib/result";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export async function signUp(
  _prevState: Result<null> | null,
  formData: FormData,
): Promise<Result<null>> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const { error } = await auth.signUp.email(parsed.data);
  if (error) {
    console.error("signUp failed", error);
    return fail("Could not create account. This email may already be in use.");
  }

  redirect("/dashboard");
}

export async function signIn(
  _prevState: Result<null> | null,
  formData: FormData,
): Promise<Result<null>> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid input.");
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
