"use client";

import { create } from "zustand";
import { Chatbot } from "@/types/chatbot";

interface ChatbotStore {
  chatbots: Chatbot[];
  selectedChatbotId: string | null;
  setChatbots: (chatbots: Chatbot[]) => void;
  addChatbot: (chatbot: Chatbot) => void;
  removeChatbot: (id: string) => void;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
  setSelectedChatbot: (id: string | null) => void;
}

export const useChatbotStore = create<ChatbotStore>((set) => ({
  chatbots: [],
  selectedChatbotId: null,
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
  setSelectedChatbot: (id) => {
    console.log("Setting selectedChatbotId to:", id);
    set({ selectedChatbotId: id });
  },
}));
