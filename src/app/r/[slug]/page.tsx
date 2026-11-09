import { notFound, redirect } from "next/navigation";

import { trackClickAndGetDestination } from "@/lib/db/links";

export const instant = false;

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: destination, error } = await trackClickAndGetDestination(slug);
  if (error) throw new Error(error);
  if (!destination) notFound();

  redirect(destination);
}
