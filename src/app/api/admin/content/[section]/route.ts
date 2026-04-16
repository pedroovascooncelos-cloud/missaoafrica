import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getSiteContent, saveSiteSection } from "@/data/site-repository";
import { requireAdminSession } from "@/lib/auth/session";
import { siteSectionSchemas, type SiteSection } from "@/types/site";

function isValidSection(value: string): value is SiteSection {
  return value in siteSectionSchemas;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  try {
    await requireAdminSession();
    const { section } = await params;

    if (!isValidSection(section)) {
      return NextResponse.json({ error: "Seção inválida." }, { status: 404 });
    }

    const content = await getSiteContent();
    return NextResponse.json({ data: content[section] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Acesso não autorizado.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  try {
    await requireAdminSession();
    const { section } = await params;

    if (!isValidSection(section)) {
      return NextResponse.json({ error: "Seção inválida." }, { status: 404 });
    }

    const payload = await request.json();
    const data = await saveSiteSection(section, payload);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos para a seção.",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    const message = error instanceof Error ? error.message : "Falha ao salvar conteúdo.";
    const status = message.includes("Sessão") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
