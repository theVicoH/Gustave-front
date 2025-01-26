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

export interface ChatbotMessageAttributes {
  content: string;
  total_tokens: number;
}

export type ChatbotMessageResponse = Response<ChatbotMessageAttributes, []>;
