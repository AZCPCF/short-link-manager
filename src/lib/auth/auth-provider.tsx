"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { AuthUser } from "./types";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: AuthUser | null;
  children: ReactNode;
}) {
  return (
    <AuthContext value={{ user, isAuthenticated: user !== null }}>
      {children}
    </AuthContext>
  );
}

export function useAuth(): AuthState {
  const state = useContext(AuthContext);
  if (!state) throw new Error("useAuth must be used inside AuthProvider");
  return state;
}