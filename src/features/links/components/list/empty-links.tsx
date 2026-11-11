import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { EmptyState } from "@/components/kit/empty-state";
import { CreateLinkDialog } from "../create/create-link-dialog";

export function EmptyLinks() {
  const t = useTranslations("Links.empty");

  return (
    <EmptyState
      icon={Link2}
      title={t("title")}
      description={t("description")}
      action={<CreateLinkDialog />}
    />
  );
}
