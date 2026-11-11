import { Atom } from "lucide-react";

import { getLandingT } from "@/features/landing/get-t";

export async function LandingFooter() {
  const t = await getLandingT();

  return (
    <footer className="border-t py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <Atom className="size-4" aria-hidden />
          {t("brand")}
        </span>
        <span>{t("footer.tagline")}</span>
      </div>
    </footer>
  );
}
