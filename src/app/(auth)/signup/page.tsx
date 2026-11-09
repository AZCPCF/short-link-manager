"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/actions/auth";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const handleSubmit = useManualSubmit(formAction);

  useEffect(() => {
    if (state?.error && !state.fieldErrors) toast.error(state.error);
  }, [state]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Sign up to start creating short links.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <FormField
              name="name"
              label="Name"
              placeholder="John Doe"
              autoComplete="name"
              error={state?.fieldErrors?.name}
            />
            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="email"
              error={state?.fieldErrors?.email}
            />
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              hint="At least 8 characters."
              error={state?.fieldErrors?.password}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Create account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
