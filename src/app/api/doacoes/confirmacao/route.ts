import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getAdminDb } from "@/lib/firebase/admin";
import { donationConfirmationSchema } from "@/types/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = donationConfirmationSchema.parse({
      nome: body.nome,
      email: body.email,
      whatsapp: body.whatsapp,
      valor: Number(body.valor),
      txid: body.txid ? String(body.txid) : undefined,
      comprovante: body.comprovante ? String(body.comprovante) : undefined,
      consentimento: body.consentimento === true,
    });

    await getAdminDb().collection("donationConfirmations").add({
      ...parsed,
      createdAt: FieldValue.serverTimestamp(),
      origem: "site",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos para confirmar a doação.",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Não foi possível registrar a confirmação da doação.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
