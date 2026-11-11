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
import { CopyLinkButton } from "../buttons/copy-link-button";
import { ClicksChart } from "./clicks-chart";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export async function LinkDetail({ id }: { id: string }) {
  const user = await requireUser();

  const [linkResult, clicksResult] = await Promise.all([
    getLinkById(id, user.id),
    getDailyClicks(id, user.id),
  ]);

  if (linkResult.error !== null) throw new Error(linkResult.error);
  if (clicksResult.error !== null) throw new Error(clicksResult.error);
  if (!linkResult.data) notFound();

  const link = linkResult.data;
  const chartData = fillMissingDays(clicksResult.data);

  return (
    <>
      <PageHeader
        title={link.title ?? `/r/${link.slug}`}
        description={
          <span className="flex items-center gap-1">
            /r/{link.slug}
            <CopyLinkButton slug={link.slug} />
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          className="sm:col-span-2"
          label="Destination"
          value={
            <a
              href={link.destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium break-all hover:underline"
            >
              {link.destinationUrl}
            </a>
          }
        />
        <StatCard label="Total clicks" value={link.clickCount} />
        <StatCard
          label="Created"
          value={dateFormatter.format(link.createdAt)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clicks per day</CardTitle>
          <CardDescription>Last 7 days (UTC)</CardDescription>
        </CardHeader>
        <CardContent>
          <ClicksChart data={chartData} />
        </CardContent>
      </Card>
    </>
  );
}
