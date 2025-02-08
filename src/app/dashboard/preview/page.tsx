"use client";

import { Chatbot } from "@/features/chatbot/chatbot";

export default function PreviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aperçu</h1>
      </div>

      <Chatbot
        className="h-[80vh]"
        chatbotId="3"
        conversationId="818a1631-44f9-4727-9f5b-c15383a181ee"
      />
    </div>
  );
}
