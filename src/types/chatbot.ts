import { Status, Response } from "./types";

export type ChatbotStatus = "public" | "privé";

export interface CreateChatBotBody {
  name: string;
  status: ChatbotStatus;
}

export interface CreateChatbotAttributes {
  id: number;
  name: string;
  active: boolean;
  status: ChatbotStatus;
  created_at: string;
  updated_at: string;
}

export interface Chatbot {
  id: number;
  name: string;
  status: ChatbotStatus;
  platform: string;
  visibility: string;
}

export interface CreateChatbotResponse {
  data: {
    attributes: {
      id: number;
      name: string;
      active: boolean;
      status: string;
      created_at: string;
      updated_at: string;
    };
    relationships: any[];
  };
}

export interface SendChatbotConversationMessageBody {
  message: string;
  chatbotId: number;
  conversationId: string;
}

export interface SendChatbotConversationMessageAttributes {
  content: string;
  total_tokens: number;
}

export type SendChatbotConversationMessageResponse = Response<
  SendChatbotConversationMessageAttributes,
  []
>;

export interface ChatbotConversationAllMessagesParams {
  chatbotId: string;
  conversationId: string;
}

export interface ChatbotConversationAllMessagesAttributes {
  user_message: string;
  assistant_message: string;
  total_token: number;
  conversation_id: string;
  chatbot_id: number;
  created_at: string;
  updated_at: string;
}

export type ChatbotConversationAllMessagesResponse = Response<
  ChatbotConversationAllMessagesAttributes,
  []
>;
