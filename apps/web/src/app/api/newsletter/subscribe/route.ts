import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalido" },
        { status: 400 }
      );
    }

    // TODO: When DB is connected, insert into subscribers table
    // For now, just return success
    // import { db } from "@/lib/db";
    // import { subscribers } from "@/db/schema";
    // await db.insert(subscribers).values({ email }).onConflictDoNothing();

    console.log(`[Newsletter] Nuevo suscriptor: ${email}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
