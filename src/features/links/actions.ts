"use server";

import { revalidatePath } from "next/cache";

import {
  createLinkFields,
  createLinkSchema,
  deleteLinkSchema,
} from "@/features/links/schemas";
import { generateSlug } from "@/features/links/slug";
import { requireUser } from "@/lib/auth/session";
import { createLink, deleteLink } from "@/lib/db/links";
import type { Link } from "@/lib/db/schema";
import { toFieldErrors } from "@/lib/form/field-errors";
import { fail, type FormResult, type Result } from "@/lib/result";

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
      ...fail("validation"),
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

    if (result.error !== "slugTaken") {
      if (result.data) revalidatePath("/[locale]/dashboard", "page");
      return result;
    }
  }

  return slug
    ? { ...fail("slugTaken"), fieldErrors: { slug: "slugTaken" } }
    : fail("slugGenerationFailed");
}

export async function deleteLinkAction(id: string): Promise<Result<null>> {
  const user = await requireUser();

  const parsed = deleteLinkSchema.safeParse({ id });
  if (!parsed.success) return fail("invalidLink");

  const result = await deleteLink(parsed.data.id, user.id);
  if (!result.error) revalidatePath("/[locale]/dashboard", "page");
  return result;
}
