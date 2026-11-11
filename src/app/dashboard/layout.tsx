import Link from "next/link";
import { Suspense, type ReactNode } from "react";

import { Container } from "@/components/kit/container";
import { Logo } from "@/components/kit/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/features/auth/actions";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { requireUser } from "@/lib/auth/session";
import { CreateLinkDialog } from "@/features/links/components/create/create-link-dialog";

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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <Link href="/dashboard">
              <Logo />
            </Link>
            <Suspense fallback={<Skeleton className="h-4 w-32" />}>
              <Greeting />
            </Suspense>
          </div>
          <div className="flex items-center gap-2">
            <CreateLinkDialog />
            <ThemeToggle />
            <form action={signOut}>
              <LogoutButton />
            </form>
          </div>
        </Container>
      </header>
      <main className="flex-1">
        <Container className="flex flex-col gap-8 py-8">{children}</Container>
      </main>
    </div>
  );
}
