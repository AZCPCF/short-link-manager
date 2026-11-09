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
import { signIn } from "@/lib/actions/auth";
import { useManualSubmit } from "@/lib/hooks/use-manual-submit";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, null);
  const handleSubmit = useManualSubmit(formAction);

  useEffect(() => {
    if (state?.error && !state.fieldErrors) toast.error(state.error);
  }, [state]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Welcome back. Enter your details to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <FormField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              error={state?.fieldErrors?.email}
            />
            <FormField
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              hint="At least 8 characters."
              error={state?.fieldErrors?.password}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Log in"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
