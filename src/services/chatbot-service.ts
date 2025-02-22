import ApiService from '@/app/core/web/ApiService';
import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
  Chatbot,
} from "@/types/chatbot";

const api = new ApiService('/api');

export const postCreateChatbot = async (data: CreateChatBotBody) => {
  return api.post<CreateChatbotResponse>('/chatbot/create', data);
};

export const getChatbots = async () => {
  return api.get<Chatbot[]>('/chatbots');
};

export const updateChatbot = async (id: string, data: CreateChatBotBody) => {
  return api.put<Chatbot>(`/chatbot/${id}`, data);
};

export const deleteChatbot = async (id: string) => {
  return api.delete<void>(`/chatbot/${id}`);
};

export const postConversationChatbotMessage = async ({
  message,
  chatbotId,
  conversationId,
}: SendChatbotConversationMessageBody): Promise<SendChatbotConversationMessageResponse> => {
  return api.post<SendChatbotConversationMessageResponse>(
    '/chatbot/conversation/send-message',
    { message, chatbotId, conversationId }
  );
};

export const getConversationChatbotMessage = async ({
  chatbotId,
  conversationId,
}: ChatbotConversationAllMessagesParams): Promise<ChatbotConversationAllMessagesResponse[]> => {
  return api.get<ChatbotConversationAllMessagesResponse[]>(
    `/chatbot/conversation/all-messages/${chatbotId}/${conversationId}`
  );
};
