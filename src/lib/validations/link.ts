import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const createLinkSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .pipe(z.url({ protocol: /^https?$/, error: "Enter a valid http(s) URL." })),
  slug: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(64, "Slug can be at most 64 characters.")
      .regex(/^[a-zA-Z0-9-]+$/, "Use only letters, numbers and dashes.")
      .optional(),
  ),
  title: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(120, "Title can be at most 120 characters.")
      .optional(),
  ),
});

export const deleteLinkSchema = z.object({
  id: z.uuid(),
});

export const createLinkFields = ["destinationUrl", "slug", "title"] as const;
