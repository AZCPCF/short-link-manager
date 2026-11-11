"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/kit/form-field";
import { Button } from "@/components/ui/button";
import { signIn } from "@/features/auth/actions";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, null);
  const handleSubmit = useManualSubmit(formAction);

  useEffect(() => {
    if (state?.error && !state.fieldErrors) toast.error(state.error);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={state?.fieldErrors?.email}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Your password"
        error={state?.fieldErrors?.password}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
