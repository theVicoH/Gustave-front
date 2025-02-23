import {
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
} from "@/types/chatbot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendChatbotConversationMessageBody;

    const res = await fetch(
      `${process.env.API_ENVIRONMENT_URL}/chatbot/message/send/${body.chatbotId}/${body.conversationId}`,
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

    // Créer la réponse
    const response = NextResponse.json(data);

    // Récupérer et transmettre les nouveaux cookies
    const newCookies = res.headers.get("set-cookie");
    if (newCookies) {
      response.headers.set("Set-Cookie", newCookies);
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
