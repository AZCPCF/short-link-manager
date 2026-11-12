import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getLandingT } from "@/features/landing/get-t";
import { getOptionalUser } from "@/lib/auth/optional-user";

export async function ContinueButton() {
  const t = await getLandingT();
  const user = await getOptionalUser();
  const href = user ? "/dashboard" : "/login";

  return (
    <Link href={href} className={buttonVariants({ size: "lg" })}>
      {t("hero.continue")}
      <ArrowRight className="rtl:rotate-180" aria-hidden />
    </Link>
  );
}
