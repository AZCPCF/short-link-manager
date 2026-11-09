import { LinksListSkeleton } from "@/components/links/links-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <Skeleton className="h-64 w-full" />
      <LinksListSkeleton />
    </>
  );
}
