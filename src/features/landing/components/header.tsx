import { Atom } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { getLandingT } from "@/features/landing/get-t";
import { LocaleSwitcher } from "@/components/locale-switcher";

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
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            {t("nav.login")}
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "sm" })}>
            {t("nav.signup")}
          </Link>
        </div>
      </div>
    </header>
  );
}
