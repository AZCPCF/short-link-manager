"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyLinkButton({ slug }: { slug: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/r/${slug}`,
      );
      toast.success("Short link copied.");
    } catch {
      toast.error("Could not copy the link.");
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label={`Copy short link /r/${slug}`}
    >
      <Copy />
    </Button>
  );
}
