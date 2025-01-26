"use client";

import { CreateChatbotAttributes } from "@/types/chatbot";
import { create } from "zustand";

interface ChatbotStore {
  chatbot: CreateChatbotAttributes | null;
  setChatbot: (chatbot: CreateChatbotAttributes) => void;
}

export const useChatbotStore = create<ChatbotStore>((set) => ({
  chatbot: null,
  setChatbot: (chatbot) => set({ chatbot }),
}));
