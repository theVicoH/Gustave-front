import { create } from "zustand";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ConversationStore = {
  messages: Message[];
  addMessage: (role: "user" | "assistant", content: string) => void;
  resetMessages: () => void;
};

export const usePublicConversationStore = create<ConversationStore>((set) => ({
  messages: [],
  addMessage: (role, content) =>
    set((state) => ({
      messages: [...state.messages, { role, content }],
    })),
  resetMessages: () => set({ messages: [] }),
}));
