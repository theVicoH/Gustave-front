"use client"

import { ChatbotAttributes } from '@/types/chatbot';
import { create } from 'zustand'

interface ChatbotStore {
  chatbot: ChatbotAttributes | null;
  setChatbot: (chatbot: ChatbotAttributes) => void;
}
 

export const useChatbotStore = create<ChatbotStore>((set) => ({
  chatbot: null,
  setChatbot: (chatbot) => set({ chatbot })
}));