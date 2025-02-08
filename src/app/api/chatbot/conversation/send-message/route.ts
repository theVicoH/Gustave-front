import {
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
} from "@/types/chatbot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendChatbotConversationMessageBody;

    const response = await fetch(
      `${process.env.API_URL}/chatbot/message/send/${body.chatbotId}/${body.conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: body.message,
        }),
      }
    );

    const data =
      (await response.json()) as SendChatbotConversationMessageResponse;
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
