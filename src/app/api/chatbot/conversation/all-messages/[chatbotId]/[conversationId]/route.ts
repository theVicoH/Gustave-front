import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";
import {
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
} from "@/types/chatbot";

export async function GET(
  { params }: { params: ChatbotConversationAllMessagesParams }
) {
  try {
    const { chatbotId, conversationId } = params;
    const api = new NextApiService();

    const response = await api.get<ChatbotConversationAllMessagesResponse[]>(
      `/messages/${chatbotId}/${conversationId}`,
      {
        headers: {
          'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    const data = await response.json() as ChatbotConversationAllMessagesResponse[];
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des messages" },
      { status: 500 }
    );
  }
}
