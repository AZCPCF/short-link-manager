"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyLinkButton({ slug }: { slug: string }) {
  const t = useTranslations("Links.copy");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/r/${slug}`,
      );
      toast.success(t("success"));
    } catch {
      toast.error(t("error"));
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label={t("label", { slug })}
    >
      <Copy />
    </Button>
  );
}
