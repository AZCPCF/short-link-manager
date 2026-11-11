"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { FormField } from "@/components/kit/form-field";
import { Button } from "@/components/ui/button";
import { signIn } from "@/features/auth/actions";
import { useErrorToast } from "@/lib/form/use-error-toast";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function LoginForm() {
  const t = useTranslations("Auth");
  const [state, formAction, isPending] = useActionState(signIn, null);
  const handleSubmit = useManualSubmit(formAction);
  useErrorToast(state);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
        autoComplete="current-password"
        error={state?.fieldErrors?.password}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? t("login.submitting") : t("login.submit")}
      </Button>
    </form>
  );
}
