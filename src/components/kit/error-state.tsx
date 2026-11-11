import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ErrorState({
  reset,
  className,
}: {
  reset: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-4 text-center",
        className,
      )}
    >
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-sm text-muted-foreground">
        We couldn&apos;t load this page. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
