"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/auth-provider";

type Props = {
  labels: {
    login: string;
    signup: string;
    dashboard: string;
  };
};

export function HeaderAuthActions({ labels }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
        {labels.dashboard}
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        {labels.login}
      </Link>
      <Link href="/signup" className={buttonVariants({ size: "sm" })}>
        {labels.signup}
      </Link>
    </>
  );
}
