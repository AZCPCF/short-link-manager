import type { ReactNode } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "../theme-toggle";

export function CenteredPage({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="absolute end-4 top-4 flex gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
      {children}
    </main>
  );
}
