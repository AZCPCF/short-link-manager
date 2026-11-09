import { redirect } from "next/navigation";

import { auth } from "./server";

export async function requireUser() {
  const { data } = await auth.getSession();
  if (!data?.user) redirect("/login");
  return data.user;
}
