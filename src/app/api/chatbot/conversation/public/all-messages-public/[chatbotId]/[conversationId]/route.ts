import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ chatbotId: string; conversationId: string }> }
) {
  try {
    const params = await context.params;

    if (!params.chatbotId || !params.conversationId) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.API_ENVIRONMENT_URL}/messages/${params.chatbotId}/${params.conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des messages" },
      { status: 500 }
    );
  }
}
