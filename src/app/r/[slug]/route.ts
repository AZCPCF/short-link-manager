import { NextResponse } from "next/server";

import { trackClickAndGetDestination } from "@/lib/db/links";
import { slugSchema } from "@/features/links/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const notFoundUrl = new URL("/link-not-found", request.url);
  if (!slugSchema.safeParse(slug).success)
    return NextResponse.redirect(notFoundUrl);

  const { data: destination, error } = await trackClickAndGetDestination(slug);
  if (error !== null) {
    return new Response("Something went wrong. Please try again.", {
      status: 500,
    });
  }
  if (!destination) {
    return NextResponse.redirect(new URL("/link-not-found", request.url));
  }

  return NextResponse.redirect(destination, 307);
}
