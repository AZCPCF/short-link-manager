import { Suspense } from "react";

import { CreateLinkForm } from "@/components/links/create-link-form";
import { LinksList } from "@/components/links/links-list";
import { LinksListSkeleton } from "@/components/links/links-list-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New short link</CardTitle>
          <CardDescription>
            Leave the slug empty to get a random 6-character one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateLinkForm />
        </CardContent>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Your links</h2>
        <Suspense fallback={<LinksListSkeleton />}>
          <LinksList />
        </Suspense>
      </section>
    </>
  );
}
