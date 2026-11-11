import { Link2 } from "lucide-react";

import { EmptyState } from "@/components/kit/empty-state";
import { CreateLinkDialog } from "../create/create-link-dialog";

export function EmptyLinks() {
  return (
    <EmptyState
      icon={Link2}
      title="No links yet"
      description="Create your first short link and start tracking its clicks."
      action={<CreateLinkDialog />}
    />
  );
}
