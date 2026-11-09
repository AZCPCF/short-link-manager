import { randomInt } from "node:crypto";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const SLUG_LENGTH = 6;

export function generateSlug(): string {
  return Array.from(
    { length: SLUG_LENGTH },
    () => ALPHABET[randomInt(ALPHABET.length)],
  ).join("");
}
