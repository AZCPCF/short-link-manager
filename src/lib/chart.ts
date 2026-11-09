import type { DailyClicks } from "@/lib/db/links";

export function fillMissingDays(rows: DailyClicks[], days = 7): DailyClicks[] {
  const countByDate = new Map(rows.map((row) => [row.date, row.count]));
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const day = new Date(today);
    day.setUTCDate(today.getUTCDate() - (days - 1 - index));
    const date = day.toISOString().slice(0, 10);
    return { date, count: countByDate.get(date) ?? 0 };
  });
}
