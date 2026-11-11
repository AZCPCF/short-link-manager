"use client";

import { ErrorState } from "@/components/kit/error-state";

export default function DashboardError({ reset }: { reset: () => void }) {
  return <ErrorState reset={reset} />;
}
