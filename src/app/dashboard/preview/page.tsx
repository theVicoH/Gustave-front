"use client";

import { Chatbot } from "@/features/chatbot/chatbot";
import { useChatbotStore } from "@/stores/chatbot-store";

export default function PreviewPage() {
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);

  if (!selectedChatbotId) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500">Veuillez sélectionner un chatbot</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aperçu</h1>
      </div>

      <Chatbot className="h-[80vh]" chatbotId={selectedChatbotId} />
    </div>
  );
}
