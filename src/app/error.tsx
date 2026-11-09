"use client";

import { ErrorState } from "@/components/error-state";

export default function RootError({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} className="min-h-screen" />;
}
