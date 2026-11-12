import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function BackButton({ label }: { label: string }) {
  return (
    <Link
      href="/"
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "-ms-2 w-fit justify-self-start",
      })}
    >
      <ArrowLeft className="rtl:rotate-180" aria-hidden />
      {label}
    </Link>
  );
}
