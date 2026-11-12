"use client";

import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
type Props = { reset: () => void; className?: string };

export function ErrorState({ reset, className }: Props) {
  const t = useTranslations("ErrorState");
  const common = useTranslations("Common");

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-4 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-sm text-muted-foreground">{t("description")}</p>
      <Button onClick={reset}>{common("tryAgain")}</Button>
    </div>
  );
}
