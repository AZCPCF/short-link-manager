import { getLocale } from "next-intl/server";
import { connection } from "next/server";
import { cache } from "react";

import { redirect } from "@/i18n/navigation";

import { auth } from "./server";

export const requireUser = cache(async () => {
  await connection();
  const { data } = await auth.getSession();
  if (!data?.user)
    return redirect({ href: "/login", locale: await getLocale() });
  return data.user;
});
