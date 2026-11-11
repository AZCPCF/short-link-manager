import NextLink from "next/link";

import { CopyLinkButton } from "@/features/links/components/buttons/copy-link-button";
import { DeleteLinkButton } from "@/features/links/components/buttons/delete-link-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Link } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function LinksTable({ links }: { links: Link[] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead className="hidden md:table-cell">Destination</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="hidden sm:table-cell">Created</TableHead>
            <TableHead className="w-24">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <NextLink
                  href={`/dashboard/links/${link.id}`}
                  className="font-medium hover:underline"
                >
                  {link.title ?? `/r/${link.slug}`}
                </NextLink>
                {link.title && (
                  <p className="text-sm text-muted-foreground">
                    /r/{link.slug}
                  </p>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="max-w-xs truncate" title={link.destinationUrl}>
                  {link.destinationUrl}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary" className="tabular-nums">
                  {link.clickCount}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {dateFormatter.format(link.createdAt)}
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
