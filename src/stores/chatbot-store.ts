"use client";

import { create } from "zustand";
import { Chatbot } from "@/types/chatbot";

interface ChatbotStore {
  chatbots: Chatbot[];
  setChatbots: (chatbots: Chatbot[]) => void;
  addChatbot: (chatbot: Chatbot) => void;
  removeChatbot: (id: string) => void;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
}

export const useChatbotStore = create<ChatbotStore>((set) => ({
  chatbots: [],
  setChatbots: (chatbots: Chatbot[]) => set({ chatbots }),
  addChatbot: (chatbot) =>
    set((state) => ({ chatbots: [...state.chatbots, chatbot] })),
  removeChatbot: (id) =>
    set((state) => ({
      chatbots: state.chatbots.filter((bot) => bot.id.toString() !== id),
    })),
  updateChatbot: (id, updates) =>
    set((state) => ({
      chatbots: state.chatbots.map((bot) =>
        bot.id.toString() === id ? { ...bot, ...updates } : bot
      ),
    })),
}));
