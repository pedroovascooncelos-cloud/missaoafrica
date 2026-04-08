import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: pathParts } = await params;
  const relativePath = pathParts.join("/");
  const normalized = path.posix.normalize(relativePath);

  if (normalized.includes("..")) {
    return NextResponse.json({ error: "Caminho inválido." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "assets", ...pathParts);
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension];

  if (!contentType) {
    return NextResponse.json({ error: "Formato não suportado." }, { status: 415 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }
}
