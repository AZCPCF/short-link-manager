import { useFormatter, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link as NextLink } from "@/i18n/navigation";
import type { Link } from "@/lib/db/schema";
import { CopyLinkButton } from "../buttons/copy-link-button";
import { DeleteLinkButton } from "../buttons/delete-link-button";

export function LinksTable({ links }: { links: Link[] }) {
  const t = useTranslations("Links.table");
  const format = useFormatter();

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("link")}</TableHead>
            <TableHead className="hidden md:table-cell">
              {t("destination")}
            </TableHead>
            <TableHead className="text-end">{t("clicks")}</TableHead>
            <TableHead className="hidden sm:table-cell">
              {t("created")}
            </TableHead>
            <TableHead className="w-24">
              <span className="sr-only">{t("actions")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <NextLink
                  href={`/dashboard/links/${link.id}`}
                  dir="auto"
                  className="font-medium hover:underline"
                >
                  {link.title ?? <bdi dir="ltr">/r/{link.slug}</bdi>}
                </NextLink>
                {link.title && (
                  <p className="text-sm text-muted-foreground">
                    <bdi dir="ltr">/r/{link.slug}</bdi>
                  </p>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div
                  className="max-w-xs truncate"
                  dir="ltr"
                  title={link.destinationUrl}
                >
                  {link.destinationUrl}
                </div>
              </TableCell>
              <TableCell className="text-end">
                <Badge variant="secondary" className="tabular-nums">
                  {format.number(link.clickCount)}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {format.dateTime(link.createdAt, { dateStyle: "medium" })}
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <CopyLinkButton slug={link.slug} />
                  <DeleteLinkButton id={link.id} slug={link.slug} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
