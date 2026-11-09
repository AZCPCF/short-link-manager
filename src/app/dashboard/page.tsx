import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/lib/actions/auth";
import { requireUser } from "@/lib/auth/session";
import { CreateLinkForm } from "@/components/links/create-link-form";

async function Greeting() {
  const user = await requireUser();

  return <h1 className="text-2xl font-semibold">Hi, {user.name}</h1>;
}

export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <Suspense fallback={<Skeleton className="h-8 w-48" />}>
        <Greeting />
        <CreateLinkForm />
      </Suspense>
      <form action={signOut}>
        <Button type="submit" variant="outline">
          Log out
        </Button>
      </form>
    </main>
  );
}
