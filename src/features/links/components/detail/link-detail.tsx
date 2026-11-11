import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/kit/page-header";
import { StatCard } from "@/components/kit/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fillMissingDays } from "@/features/links/chart";
import { requireUser } from "@/lib/auth/session";
import { getDailyClicks, getLinkById } from "@/lib/db/links";
import { ClicksChart } from "./clicks-chart";
import { CopyLinkButton } from "../buttons/copy-link-button";

export async function LinkDetail({ id }: { id: string }) {
  const user = await requireUser();

  const [linkResult, clicksResult] = await Promise.all([
    getLinkById(id, user.id),
    getDailyClicks(id, user.id),
  ]);

  if (linkResult.error !== null) throw new Error(linkResult.error);
  if (clicksResult.error !== null) throw new Error(clicksResult.error);
  if (!linkResult.data) notFound();

  const [t, format] = await Promise.all([
    getTranslations("Links.detail"),
    getFormatter(),
  ]);
  const link = linkResult.data;
  const chartData = fillMissingDays(clicksResult.data);

  return (
    <>
      <PageHeader
        title={link.title ?? `/r/${link.slug}`}
        description={
          <span className="flex items-center gap-1">
            <bdi dir="ltr">/r/{link.slug}</bdi>
            <CopyLinkButton slug={link.slug} />
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          className="sm:col-span-2"
          label={t("destination")}
          value={
            <a
              href={link.destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="block text-base font-medium break-all hover:underline"
            >
              {link.destinationUrl}
            </a>
          }
        />
        <StatCard
          label={t("totalClicks")}
          value={format.number(link.clickCount)}
        />
        <StatCard
          label={t("created")}
          value={format.dateTime(link.createdAt, { dateStyle: "medium" })}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("chartTitle")}</CardTitle>
          <CardDescription>{t("chartDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ClicksChart data={chartData} />
        </CardContent>
      </Card>
    </>
  );
}
