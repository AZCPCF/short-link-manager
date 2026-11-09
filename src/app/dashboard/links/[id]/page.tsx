import Link from "next/link";
import { Suspense } from "react";

import { LinkDetail } from "@/components/links/link-detail";
import { LinkDetailSkeleton } from "@/components/links/link-detail-skeleton";

export default function LinkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to dashboard
      </Link>
      <Suspense fallback={<LinkDetailSkeleton />}>
        <LinkDetailLoader params={params} />
      </Suspense>
    </>
  );
}

async function LinkDetailLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LinkDetail id={id} />;
}
