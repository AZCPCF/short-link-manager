import { Atom } from "lucide-react";
import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { getLandingT } from "@/features/landing/get-t";
import { HeaderAuthActions } from "./header-auth-actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthSessionProvider } from "@/features/auth/components/auth-session-provider";

export async function LandingHeader() {
  const t = await getLandingT();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Atom className="size-6 text-primary" aria-hidden />
          <span className="hidden sm:inline">{t("brand")}</span>
        </Link>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Suspense fallback={<Skeleton className="h-9 w-40" />}>
            <AuthSessionProvider>
              <HeaderAuthActions
                labels={{
                  login: t("nav.login"),
                  signup: t("nav.signup"),
                  dashboard: t("nav.dashboard"),
                }}
              />
            </AuthSessionProvider>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
