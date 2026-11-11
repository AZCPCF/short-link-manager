"use client";

import { ErrorState } from "@/components/kit/error-state";

export default function RootError({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} className="min-h-screen" />;
}
