"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth/session";
import { createLink, deleteLink, SLUG_TAKEN_ERROR } from "@/lib/db/links";
import type { Link } from "@/lib/db/schema";
import { fail, type FormResult, type Result } from "@/lib/result";
import { generateSlug } from "@/features/links/slug";
import {
  toFieldErrors,
  VALIDATION_ERROR,
} from "@/lib/form/field-errors";
import {
  createLinkFields,
  createLinkSchema,
  deleteLinkSchema,
} from "@/features/links/schemas";

const MAX_SLUG_ATTEMPTS = 5;

export type CreateLinkResult = FormResult<
  Link,
  (typeof createLinkFields)[number]
>;

export async function createLinkAction(
  _prevState: CreateLinkResult | null,
  formData: FormData,
): Promise<CreateLinkResult> {
  const user = await requireUser();

  const parsed = createLinkSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ...fail(VALIDATION_ERROR),
      fieldErrors: toFieldErrors(parsed.error, createLinkFields),
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
    ? { ...fail(SLUG_TAKEN_ERROR), fieldErrors: { slug: SLUG_TAKEN_ERROR } }
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
