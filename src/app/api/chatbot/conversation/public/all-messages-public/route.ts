import { NextResponse } from "next/server";
import { ChatbotConversationAllMessagesResponse } from "@/types/chatbot";

export async function GET(req: Request) {
  try {
    const chatbotId = "6";
    const conversationId = "aec85fd4-3e19-4f6a-b08e-fc0e1f6aedd5";

    const res = await fetch(
      `${process.env.API_URL}/messages/${chatbotId}/${conversationId}`,
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
