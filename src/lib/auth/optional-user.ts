import { cache } from "react";

import { auth } from "./server";
import type { AuthUser } from "./types";

export const getOptionalUser = cache(async (): Promise<AuthUser | null> => {
  const { data } = await auth.getSession();
  if (!data?.user) return null;

  const { id, name, email } = data.user;
  return { id, name, email };
});
