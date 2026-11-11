import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { LinkDetailSkeleton } from "@/features/links/components/detail/link-detail-skeleton";
import { LinkDetail } from "@/features/links/components/detail/link-detail";

type LinkDetailPageProps = { params: Promise<{ locale: string; id: string }> };

async function LinkDetailLoader({ params }: LinkDetailPageProps) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const t = await getTranslations("Links.detail");

  return (
    <>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        {t("back")}
      </Link>
      <LinkDetail id={id} />
    </>
  );
}

export default function LinkDetailPage({ params }: LinkDetailPageProps) {
  return (
    <Suspense fallback={<LinkDetailSkeleton />}>
      <LinkDetailLoader params={params} />
    </Suspense>
  );
}