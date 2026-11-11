import { getTranslations } from "next-intl/server";

import { CenteredPage } from "@/components/kit/centered-page";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const common = await getTranslations("Common");

  return (
    <CenteredPage>
      <p className="text-5xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-sm text-center text-muted-foreground">
        {t("description")}
      </p>
      <Link href="/" className={buttonVariants()}>
        {common("goHome")}
      </Link>
    </CenteredPage>
  );
}
