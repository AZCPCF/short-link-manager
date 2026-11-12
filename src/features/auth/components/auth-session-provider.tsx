import type { ReactNode } from "react";

import { AuthProvider } from "@/lib/auth/auth-provider";
import { getOptionalUser } from "@/lib/auth/optional-user";

export async function AuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getOptionalUser();
  return <AuthProvider user={user}>{children}</AuthProvider>;
}
