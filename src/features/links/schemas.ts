import { z } from "zod";

import { errorKey } from "@/lib/errors";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const slugSchema = z
  .string()
  .trim()
  .max(64, errorKey("slugTooLong"))
  .regex(/^[a-zA-Z0-9-]+$/, errorKey("slugInvalid"));

export const createLinkSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .pipe(z.url({ protocol: /^https?$/, error: errorKey("urlInvalid") })),
  slug: z.preprocess(emptyToUndefined, slugSchema.optional()),
  title: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(120, errorKey("titleTooLong")).optional(),
  ),
});

export const createLinkFields = ["destinationUrl", "slug", "title"] as const;

export const deleteLinkSchema = z.object({
  id: z.uuid(),
});
