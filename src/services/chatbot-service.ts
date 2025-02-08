import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
  Chatbot,
} from "@/types/chatbot";

export const postCreateChatbot = async (data: CreateChatBotBody) => {
  const response = await fetch("/api/chatbot/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getChatbots = async () => {
  const response = await fetch("/api/chatbots");
  return response.json();
};

export const updateChatbot = async (id: string, data: CreateChatBotBody) => {
  const response = await fetch(`/api/chatbot/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update chatbot");
  }

  return response.json();
};

export const deleteChatbot = async (id: string) => {
  const response = await fetch(`/api/chatbot/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const postConversationChatbotMessage = async ({
  message,
  chatbotId,
  conversationId,
}: SendChatbotConversationMessageBody): Promise<SendChatbotConversationMessageResponse> => {
  const res = await fetch(`/api/chatbot/conversation/send-message`, {
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
