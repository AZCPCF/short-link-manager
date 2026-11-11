"use client";

import { ErrorState } from "@/components/kit/error-state";

export default function LinkDetailError({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} />;
}
