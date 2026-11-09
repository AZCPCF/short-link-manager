"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth/session";
import { createLink, deleteLink, SLUG_TAKEN_ERROR } from "@/lib/db/links";
import { fail, type Result } from "@/lib/result";
import { generateSlug } from "@/lib/slug";
import { createLinkSchema, deleteLinkSchema } from "@/lib/validations/link";
import type { Link } from "@/lib/db/schema";

const MAX_SLUG_ATTEMPTS = 5;
const FIELDS = ["destinationUrl", "slug", "title"] as const;

export type CreateLinkField = (typeof FIELDS)[number];
export type CreateLinkResult = Result<Link> & { field?: CreateLinkField };

export async function createLinkAction(
  _prevState: CreateLinkResult | null,
  formData: FormData,
): Promise<CreateLinkResult> {
  const user = await requireUser();

  const parsed = createLinkSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ...fail(issue?.message ?? "Invalid input."),
      field: FIELDS.find((field) => field === issue?.path[0]),
    };
  }

  const { destinationUrl, slug, title } = parsed.data;
  const attempts = slug ? 1 : MAX_SLUG_ATTEMPTS;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const result = await createLink({
      userId: user.id,
      slug: slug ?? generateSlug(),
      destinationUrl,
      title,
    });

    if (result.error !== SLUG_TAKEN_ERROR) {
      if (result.data) revalidatePath("/dashboard");
      return result;
    }
  }

  return slug
    ? { ...fail(SLUG_TAKEN_ERROR), field: "slug" }
    : fail("Could not generate a unique link. Please try again.");
}

export async function deleteLinkAction(id: string): Promise<Result<null>> {
  const user = await requireUser();

  const parsed = deleteLinkSchema.safeParse({ id });
  if (!parsed.success) return fail("Invalid link.");

  const result = await deleteLink(parsed.data.id, user.id);
  if (!result.error) revalidatePath("/dashboard");
  return result;
}
