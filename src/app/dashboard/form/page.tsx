"use client";

import { useChatbotStore } from "@/stores/chatbot-store";

export default function FormPage() {
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
        <h1 className="text-3xl font-bold">Form</h1>
      </div>

      <div className="w-full h-[80vh]">
        <iframe
          src="https://forms.fillout.com/t/eii5XhE7g7us"
          className="w-full h-full border-0 rounded-lg"
          allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        />
      </div>
    </div>
  );
}
