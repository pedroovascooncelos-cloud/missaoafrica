import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth/session";
import { createCloudinaryUploadSignature, getCloudinaryConfig } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = (await request.json()) as { folder?: string };
    const config = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = body.folder || config.uploadFolder;

    const signature = createCloudinaryUploadSignature({
      folder,
      timestamp,
    });

    return NextResponse.json({
      cloudName: config.cloudName,
      apiKey: config.apiKey,
      folder,
      timestamp,
      signature,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao preparar upload.";
    const status = message.includes("Sessão") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
