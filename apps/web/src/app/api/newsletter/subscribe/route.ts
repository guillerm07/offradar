import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const normalized = email.toLowerCase().trim();

    await db
      .insert(subscribers)
      .values({ email: normalized })
      .onConflictDoNothing();

    console.log(`[Newsletter] Nuevo suscriptor: ${normalized}`);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Newsletter] Error:", e);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
