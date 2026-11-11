import type { ErrorKey } from "@/lib/errors";

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: ErrorKey };

export type FormResult<T, K extends string> = Result<T> & {
  fieldErrors?: Partial<Record<K, ErrorKey>>;
};

export const ok = <T>(data: T): Result<T> => ({ data, error: null });

export const fail = (error: ErrorKey): Result<never> => ({ data: null, error });
