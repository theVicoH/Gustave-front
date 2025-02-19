import {
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
} from "@/types/chatbot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = {
      message: (await req.json()).message,
      chatbotId: "6",
      conversationId: "aec85fd4-3e19-4f6a-b08e-fc0e1f6aedd5",
    };

    const res = await fetch(
      `${process.env.API_URL}/chatbot/message/send/${body.chatbotId}/${body.conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "http://localhost:3000",
        },
        body: JSON.stringify({
          message: body.message,
        }),
      }
    );

    const data = (await res.json()) as SendChatbotConversationMessageResponse;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
