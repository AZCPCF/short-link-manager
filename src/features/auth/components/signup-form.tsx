"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/kit/form-field";
import { Button } from "@/components/ui/button";
import { signUp } from "@/features/auth/actions";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const handleSubmit = useManualSubmit(formAction);

  useEffect(() => {
    if (state?.error && !state.fieldErrors) toast.error(state.error);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="name"
        label="Name"
        autoComplete="name"
        placeholder="Jane Doe"
        error={state?.fieldErrors?.name}
      />
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
        autoComplete="new-password"
        placeholder="Create a password"
        hint="At least 8 characters."
        error={state?.fieldErrors?.password}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
