import type { ReactNode } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "../theme-toggle";
import { BackButton } from "@/features/auth/components/back-button";
import { useTranslations } from "next-intl";

export function CenteredPage({ children }: { children: ReactNode }) {
  const t = useTranslations("Common");
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <BackButton label={t("back")} />
      <div className="absolute end-4 top-4 flex gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
      {children}
    </main>
  );
}
