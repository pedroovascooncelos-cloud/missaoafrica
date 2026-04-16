import { cookies } from "next/headers";

import { appEnv } from "@/lib/env";
import { getAdminAuth } from "@/lib/firebase/admin";

export type AdminSession = {
  uid: string;
  email: string;
};

function isAllowedAdminEmail(email: string) {
  if (appEnv.adminAllowedEmails.length === 0) {
    return true;
  }

  return appEnv.adminAllowedEmails.includes(email.toLowerCase());
}

export async function createAdminSessionCookie(idToken: string) {
  const auth = getAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const email = decoded.email?.toLowerCase();

  if (!email || !isAllowedAdminEmail(email)) {
    throw new Error("Usuário não autorizado para acessar o admin.");
  }

  return auth.createSessionCookie(idToken, {
    expiresIn: 1000 * 60 * 60 * 24 * 5,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(appEnv.firebaseSessionCookieName)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    const email = decoded.email?.toLowerCase();

    if (!email || !isAllowedAdminEmail(email)) {
      return null;
    }

    return {
      uid: decoded.uid,
      email,
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Sessão administrativa inválida.");
  }

  return session;
}
