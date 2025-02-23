import { NextResponse } from "next/server";
import { ChatbotConversationAllMessagesResponse } from "@/types/chatbot";

export async function GET(req: Request) {
  try {
    const res = await fetch(
      `${process.env.API_ENVIRONMENT_URL}/messages/${chatbotId}/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "http://localhost:3000",
        },
      }
    );

    const data = (await res.json()) as ChatbotConversationAllMessagesResponse[];
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des messages" },
      { status: 500 }
    );
  }
}
