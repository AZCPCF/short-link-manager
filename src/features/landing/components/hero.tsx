import { Atom } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ContinueButton } from "@/features/landing/components/continue-button";
import { getLandingT } from "@/features/landing/get-t";

export async function Hero() {
  const t = await getLandingT();

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Atom className="size-9" aria-hidden />
      </div>
      <p className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
        {t("hero.badge")}
      </p>
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
        {t("hero.title")}
      </h1>
      <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
        {t("hero.subtitle")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Suspense fallback={<Skeleton className="h-10 w-36" />}>
          <ContinueButton />
        </Suspense>
        <Link
          href="#how-it-works"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          {t("hero.learnMore")}
        </Link>
      </div>
    </section>
  );
}
