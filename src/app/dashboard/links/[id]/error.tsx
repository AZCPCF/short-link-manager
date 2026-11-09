"use client";

import { ErrorState } from "@/components/error-state";

export default function LinkDetailError({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} />;
}
