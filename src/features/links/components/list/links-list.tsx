import { EmptyLinks } from "@/features/links/components/list/empty-links";
import { LinksTable } from "@/features/links/components/list/links-table";
import { requireUser } from "@/lib/auth/session";
import { getLinksByUser } from "@/lib/db/links";

export async function LinksList() {
  const user = await requireUser();

  const result = await getLinksByUser(user.id);
  if (result.error !== null) throw new Error(result.error);

  return result.data.length === 0 ? (
    <EmptyLinks />
  ) : (
    <LinksTable links={result.data} />
  );
}
