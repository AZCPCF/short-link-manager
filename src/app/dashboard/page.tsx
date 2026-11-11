import { Suspense } from "react";

import { PageHeader } from "@/components/kit/page-header";
import { LinksListSkeleton } from "@/features/links/components/list/links-list-skeleton";
import { LinksList } from "@/features/links/components/list/links-list";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Your links"
        description="Create, share and track your short links."
      />
      <Suspense fallback={<LinksListSkeleton />}>
        <LinksList />
      </Suspense>
    </section>
  );
}
