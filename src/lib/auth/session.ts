import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "./server";

export const requireUser = cache(async () => {
  const { data } = await auth.getSession();
  if (!data?.user) redirect("/login");
  return data.user;
});
