import { notFound } from "next/navigation";

import { ClicksChart } from "@/features/links/components/detail/clicks-chart";
import { CopyLinkButton } from "@/features/links/components/buttons/copy-link-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { fillMissingDays } from "@/features/links/chart";
import { getDailyClicks, getLinkById } from "@/lib/db/links";

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
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">
          {link.title ?? `/r/${link.slug}`}
        </h1>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>/r/{link.slug}</span>
          <CopyLinkButton slug={link.slug} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="sm:col-span-3">
          <CardHeader>
            <CardDescription>Destination</CardDescription>
            <CardTitle className="text-base font-medium break-all">
              <a
                href={link.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.destinationUrl}
              </a>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total clicks</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {link.clickCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Created</CardDescription>
            <CardTitle className="text-xl">
              {dateFormatter.format(link.createdAt)}
            </CardTitle>
          </CardHeader>
        </Card>
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
