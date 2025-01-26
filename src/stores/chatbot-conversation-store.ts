import { create } from "zustand";

interface Message {
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ConversationStore {
  messages: Message[];
  addMessage: (sender: "user" | "assistant", content: string) => void;
  updateLastAssistantMessage: (content: string) => void;
  resetMessages: () => void;
 }
 
 export const useConversationStore = create<ConversationStore>((set) => ({
  messages: [],
  addMessage: (sender, content) => 
    set((state) => ({
      messages: [...state.messages, { 
        sender, 
        content, 
        timestamp: new Date().toISOString() 
      }],
    })),
  updateLastAssistantMessage: (content) =>
    set((state) => ({
      messages: state.messages.map((msg, i) => 
        i === state.messages.length - 1 && msg.sender === "assistant"
          ? { ...msg, content }
          : msg
      )
    })),
  resetMessages: () => set({ messages: [] }),
 }));