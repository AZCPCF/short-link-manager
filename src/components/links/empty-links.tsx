import { Link2 } from "lucide-react";

export function EmptyLinks() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-10 text-center">
      <Link2 className="size-8 text-muted-foreground" aria-hidden="true" />
      <h3 className="font-medium">No links yet</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Paste a long URL in the form above to create your first short link.
      </p>
    </div>
  );
}
