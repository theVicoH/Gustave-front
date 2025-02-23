"use client";

import useChatbotConversationAllMessages from "@/hooks/use-chatbot-conversation-all-messages";
import { useToast } from "@/hooks/use-toast";
import { useConversationStore } from "@/stores/chatbot-conversation-store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ChatbotConversationMessagesFeedProps {
  chatbotId: string;
  conversationId: string;
}

const ChatbotConversationMessagesFeed: React.FC<
  ChatbotConversationMessagesFeedProps
> = ({ chatbotId, conversationId }) => {
  const { data, error, isLoading } = useChatbotConversationAllMessages({
    chatbotId,
    conversationId,
  });
  const { toast } = useToast();
  const { messages, addMessage, resetMessages } = useConversationStore();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error retrieving messages",
        description: "Try again later",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      console.log("Données reçues de l'API:", data);
      resetMessages();

      data.forEach((message) => {
        if (message.data?.attributes) {
          const { user_message, assistant_message } = message.data.attributes;
          if (user_message) {
            console.log("Ajout message utilisateur:", user_message);
            addMessage("user", user_message);
          }
          if (assistant_message) {
            console.log("Ajout message assistant:", assistant_message);
            addMessage("assistant", assistant_message);
          }
        }
      });
    }
  }, [data, addMessage, resetMessages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div
            className={`p-4 rounded-lg ${
              message.sender === "user" ? "bg-gray-100" : "bg-blue-100"
            }`}
          >
            <p className="font-medium">
              {message.sender === "user" ? "You" : "Gustave"}
            </p>
            {message.sender === "assistant" && !message.content ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              <p className="whitespace-pre-line">{message.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatbotConversationMessagesFeed;
