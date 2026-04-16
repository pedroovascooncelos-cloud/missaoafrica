import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createAdminSessionCookie } from "@/lib/auth/session";
import { appEnv } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };

    if (!body.idToken) {
      return NextResponse.json({ error: "Token de login ausente." }, { status: 400 });
    }

    const sessionCookie = await createAdminSessionCookie(body.idToken);
    const cookieStore = await cookies();

    cookieStore.set(appEnv.firebaseSessionCookieName, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao criar sessão.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(appEnv.firebaseSessionCookieName);

  return NextResponse.json({ ok: true });
}
