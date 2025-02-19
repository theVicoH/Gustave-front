import { PublicChatbot } from "@/features/chatbot/public-chatbot";

export default function UserChatbotPage() {
  return (
    <div className="container h-[100vh] mx-auto p-4 max-w-4xl">
      <div className="h-full">
        <PublicChatbot
          title="Assistant Gustave"
          placeholder="Posez votre question..."
          className="h-full"
        />
      </div>
    </div>
  );
}
