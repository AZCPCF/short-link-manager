import { and, desc, eq, gte, sql } from "drizzle-orm";

import { fail, ok, type Result } from "@/lib/result";

import { db } from ".";
import { clicks, links, type Link, type NewLink } from "./schema";

const GENERIC_ERROR = "Something went wrong. Please try again.";

export const SLUG_TAKEN_ERROR = "That slug is already taken.";

function isUniqueViolation(error: unknown): boolean {
  let current: unknown = error;

  while (typeof current === "object" && current !== null) {
    if ("code" in current && current.code === "23505") return true;
    current = "cause" in current ? current.cause : null;
  }

  return false;
}

export type DailyClicks = { date: string; count: number };

export async function createLink(input: NewLink): Promise<Result<Link>> {
  try {
    const [link] = await db.insert(links).values(input).returning();
    return ok(link);
  } catch (error) {
    if (isUniqueViolation(error)) return fail("That slug is already taken.");
    console.error("createLink failed", error);
    return fail(GENERIC_ERROR);
  }
}

export async function getLinksByUser(userId: string): Promise<Result<Link[]>> {
  try {
    const rows = await db
      .select()
      .from(links)
      .where(eq(links.userId, userId))
      .orderBy(desc(links.createdAt));
    return ok(rows);
  } catch (error) {
    console.error("getLinksByUser failed", error);
    return fail(GENERIC_ERROR);
  }
}

export async function getLinkById(
  id: string,
  userId: string,
): Promise<Result<Link | null>> {
  try {
    const [link] = await db
      .select()
      .from(links)
      .where(and(eq(links.id, id), eq(links.userId, userId)));
    return ok(link ?? null);
  } catch (error) {
    console.error("getLinkById failed", error);
    return fail(GENERIC_ERROR);
  }
}

export async function deleteLink(
  id: string,
  userId: string,
): Promise<Result<null>> {
  try {
    await db
      .delete(links)
      .where(and(eq(links.id, id), eq(links.userId, userId)));
    return ok(null);
  } catch (error) {
    console.error("deleteLink failed", error);
    return fail(GENERIC_ERROR);
  }
}

export async function trackClickAndGetDestination(
  slug: string,
): Promise<Result<string | null>> {
  try {
    const [link] = await db.select().from(links).where(eq(links.slug, slug));
    if (!link) return ok(null);

    await db.batch([
      db
        .update(links)
        .set({ clickCount: sql`${links.clickCount} + 1` })
        .where(eq(links.id, link.id)),
      db.insert(clicks).values({ linkId: link.id }),
    ]);
    return ok(link.destinationUrl);
  } catch (error) {
    console.error("trackClickAndGetDestination failed", error);
    return fail(GENERIC_ERROR);
  }
}

export async function getDailyClicks(
  linkId: string,
  userId: string,
  days = 7,
): Promise<Result<DailyClicks[]>> {
  try {
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - (days - 1));
    since.setUTCHours(0, 0, 0, 0);

    const day = sql<string>`to_char(${clicks.clickedAt} at time zone 'UTC', 'YYYY-MM-DD')`;
    const rows = await db
      .select({ date: day, count: sql<number>`count(*)::int`  })
      .from(clicks)
      .innerJoin(links, eq(links.id, clicks.linkId))
      .where(
        and(
          eq(clicks.linkId, linkId),
          eq(links.userId, userId),
          gte(clicks.clickedAt, since),
        ),
      )
      .groupBy(day)
      .orderBy(day);
    return ok(rows);
  } catch (error) {
    console.error("getDailyClicks failed", error);
    return fail(GENERIC_ERROR);
  }
}
