"use server";

import { getLocale } from "next-intl/server";

import {
  signInFields,
  signInSchema,
  signUpFields,
  signUpSchema,
} from "@/features/auth/schemas";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth/server";
import { toFieldErrors } from "@/lib/form/field-errors";
import { fail, type FormResult } from "@/lib/result";

export type SignUpResult = FormResult<null, (typeof signUpFields)[number]>;
export type SignInResult = FormResult<null, (typeof signInFields)[number]>;

export async function signUp(
  _prevState: SignUpResult | null,
  formData: FormData,
): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ...fail("validation"),
      fieldErrors: toFieldErrors(parsed.error, signUpFields),
    };
  }

  const { error } = await auth.signUp.email(parsed.data);
  if (error) {
    console.error("signUp failed", error);
    return fail("signUpFailed");
  }

  return redirect({ href: "/dashboard", locale: await getLocale() });
}

export async function signIn(
  _prevState: SignInResult | null,
  formData: FormData,
): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ...fail("validation"),
      fieldErrors: toFieldErrors(parsed.error, signInFields),
    };
  }

  const { error } = await auth.signIn.email(parsed.data);
  if (error) {
    console.error("signIn failed", error);
    return fail("invalidCredentials");
  }

  return redirect({ href: "/dashboard", locale: await getLocale() });
}

export async function signOut(): Promise<void> {
  await auth.signOut();
  return redirect({ href: "/login", locale: await getLocale() });
}
