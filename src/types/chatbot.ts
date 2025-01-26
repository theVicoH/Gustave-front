import { Status, Response } from "./types";

export interface CreateChatBotBody {
  name: string;
  status: Status;
}

export interface ChatbotAttributes {
  id: number;
  name: string;
  active: boolean;
  status: Status;
  created_at: string;
  updated_at: string;
 }

 export type ChatbotResponse = Response<ChatbotAttributes, []>