import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
} from "@/types/chatbot";

export const postCreateChatbot = async ({
  name,
  status,
}: CreateChatBotBody): Promise<CreateChatbotResponse> => {
  const res = await fetch("/api/chatbot/create", {
    method: "POST",
    body: JSON.stringify({ name, status }),
  });

  return res.json();
};

export const postConversationChatbotMessage = async ({
  message,
  chatbotId,
  conversationId,
}: SendChatbotConversationMessageBody): Promise<SendChatbotConversationMessageResponse> => {
  const res = await fetch("/api/chatbot/conversation/send-message", {
    method: "POST",
    body: JSON.stringify({ message, chatbotId, conversationId }),
  });

  return res.json();
};

export const getConversationChatbotMessage = async ({
  chatbotId,
  conversationId,
}: ChatbotConversationAllMessagesParams): Promise<
  ChatbotConversationAllMessagesResponse[]
> => {
  const res = await fetch(
    `/api/chatbot/conversation/all-messages/${chatbotId}/${conversationId}`
  );

  return res.json();
};
