"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { FormField } from "@/components/kit/form-field";
import { Button } from "@/components/ui/button";
import { signUp } from "@/features/auth/actions";
import { useErrorToast } from "@/lib/form/use-error-toast";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function SignUpForm() {
  const t = useTranslations("Auth");
  const [state, formAction, isPending] = useActionState(signUp, null);
  const handleSubmit = useManualSubmit(formAction);
  useErrorToast(state);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="name"
        label={t("signup.name")}
        autoComplete="name"
        error={state?.fieldErrors?.name}
      />
      <FormField
        name="email"
        label={t("email")}
        type="email"
        dir="ltr"
        autoComplete="email"
        error={state?.fieldErrors?.email}
      />
      <FormField
        name="password"
        label={t("password")}
        type="password"
        dir="ltr"
        autoComplete="new-password"
        hint={t("signup.passwordHint")}
        error={state?.fieldErrors?.password}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? t("signup.submitting") : t("signup.submit")}
      </Button>
    </form>
  );
}
