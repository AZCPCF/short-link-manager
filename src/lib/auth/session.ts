import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";

import { auth } from "./server";

export const requireUser = cache(async () => {
  await connection();
  const { data } = await auth.getSession();
  if (!data?.user) redirect("/login");
  return data.user;
});