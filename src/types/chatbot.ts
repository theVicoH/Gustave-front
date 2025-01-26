import { Status, Response } from "./types";

export interface CreateChatBotBody {
  name: string;
  status: Status;
}

export interface CreateChatbotAttributes {
  id: number;
  name: string;
  active: boolean;
  status: Status;
  created_at: string;
  updated_at: string;
}

export type CreateChatbotResponse = Response<CreateChatbotAttributes, []>;

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
