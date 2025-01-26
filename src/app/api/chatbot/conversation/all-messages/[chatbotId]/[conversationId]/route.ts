import {
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
} from "@/types/chatbot";

export async function GET(
  _: Request,
  { params }: { params: ChatbotConversationAllMessagesParams }
) {
  const { chatbotId, conversationId } = params;
  const res = await fetch(
    `${process.env.API_URL}/messages/${chatbotId}/${conversationId}`
  );

  const data = (await res.json()) as ChatbotConversationAllMessagesResponse[];
  return Response.json(data);
}
