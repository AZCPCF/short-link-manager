import { Suspense } from "react";

import { LinksList } from "@/features/links/components/links-list";
import { LinksListSkeleton } from "@/features/links/components/links-list-skeleton";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Your links</h1>
      <Suspense fallback={<LinksListSkeleton />}>
        <LinksList />
      </Suspense>
    </section>
  );
}
