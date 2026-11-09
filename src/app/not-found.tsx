import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const text = {name:"string"}
  text.name = "12"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-5xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">Link not found</h1>
      <p className="max-w-sm text-muted-foreground">
        This link doesn&apos;t exist or has been removed.
      </p>
      <Button>
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}