import { Suspense } from "react";

import { LinksList } from "@/components/links/links-list";
import { LinksListSkeleton } from "@/components/links/links-list-skeleton";

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
