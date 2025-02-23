import {
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
} from "@/types/chatbot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendChatbotConversationMessageBody;
    const { message, chatbotId, conversationId } = body;

    console.log("📨 [send-message-public] Request body:", {
      message,
      chatbotId,
      conversationId,
    });
    console.log(
      "🌐 [send-message-public] API URL:",
      `${process.env.API_ENVIRONMENT_URL}/chatbot/message/send/${chatbotId}/${conversationId}`
    );

    const res = await fetch(
      `${process.env.API_ENVIRONMENT_URL}/chatbot/message/send/${chatbotId}/${conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "http://localhost:3000",
        },
        body: JSON.stringify({ message }),
      }
    );

    console.log("✅ [send-message-public] Response status:", res.status);
    const data = (await res.json()) as SendChatbotConversationMessageResponse;
    console.log("📦 [send-message-public] Response data:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ [send-message-public] Error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
