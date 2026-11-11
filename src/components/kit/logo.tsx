import { Link2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Link2 className="size-4" aria-hidden="true" />
      </span>
      {SITE_NAME}
    </span>
  );
}
