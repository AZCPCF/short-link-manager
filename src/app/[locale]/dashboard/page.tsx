import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { PageHeader } from "@/components/kit/page-header";
import { resolveLocale } from "@/i18n/server";
import { LinksListSkeleton } from "@/features/links/components/list/links-list-skeleton";
import { LinksList } from "@/features/links/components/list/links-list";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title={t("title")} description={t("description")} />
      <Suspense fallback={<LinksListSkeleton />}>
        <LinksList />
      </Suspense>
    </section>
  );
}
