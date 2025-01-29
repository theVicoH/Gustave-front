"use client";

import { Chatbot } from "@/features/chatbot/chatbot";

export default function PreviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aperçu</h1>
      </div>

      <Chatbot className="h-[46.875rem]" />
    </div>
  );
}
