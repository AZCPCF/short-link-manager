import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/signup-form";
import { Logo } from "@/components/kit/logo";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <Logo />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <CardTitle>Create account</CardTitle>
              <CardDescription>
                Sign up to start creating short links.
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignUpForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
