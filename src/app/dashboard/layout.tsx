import Link from "next/link";
import { Suspense, type ReactNode } from "react";

import { CreateLinkDialog } from "@/features/links/components/create-link-dialog";
import { LogoutButton } from "@/components/logout-button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/lib/actions/auth";
import { requireUser } from "@/lib/auth/session";
import { ThemeToggle } from "../../components/theme-toggle";

async function Greeting() {
  const user = await requireUser();

  return (
    <p className="truncate text-sm text-muted-foreground">
      Signed in as{" "}
      <span className="font-medium text-foreground">{user.name}</span>
    </p>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <Link href="/dashboard" className="text-lg font-semibold">
            Short Link Manager
          </Link>
          <Suspense fallback={<Skeleton className="h-4 w-32" />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex items-center gap-2 max-md:w-full justify-end">
          <CreateLinkDialog />
          <ThemeToggle />
          <form action={signOut}>
            <LogoutButton />
          </form>
        </div>
      </header>
      <main className="flex flex-col gap-8">{children}</main>
    </div>
  );
}
