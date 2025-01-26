import {
  CreateChatbotResponse,
  CreateChatBotBody,
  ChatbotMessageResponse,
  SendChatbotConversationMessageBody,
} from "@/types/chatbot";

export const createChatbot = async ({
  name,
  status,
}: CreateChatBotBody): Promise<CreateChatbotResponse> => {
  const res = await fetch("/api/chatbot/create", {
    method: "POST",
    body: JSON.stringify({ name, status }),
  });

  return res.json();
};

export const sendConversationChatbotMessage = async ({ message, chatbotId, conversationId }: SendChatbotConversationMessageBody): Promise<ChatbotMessageResponse> => {
  const res = await fetch("/api/chatbot/conversation/send-message", {
    method: "POST",
    body: JSON.stringify({ message, chatbotId, conversationId }),
  });

  return res.json();
};
