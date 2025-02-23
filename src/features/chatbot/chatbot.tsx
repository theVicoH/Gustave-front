"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import useSendConversationChatbotMessage from "@/hooks/use-send-conversation-chatbot-message";
import { useConversationStore } from "@/stores/chatbot-conversation-store";
import useChatbotConversationAllMessages from "@/hooks/use-chatbot-conversation-all-messages";

interface ChatbotProps {
  title?: string;
  placeholder?: string;
  className?: string;
  chatbotId?: string;
  conversationId?: string;
}

export function Chatbot({
  title = "Chatbot",
  placeholder = "Ask anything.",
  className,
  chatbotId = "3",
  conversationId = "818a1631-44f9-4727-9f5b-c15383a181ee",
}: ChatbotProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { mutate, isPending } = useSendConversationChatbotMessage();
  const { messages, resetMessages, addMessage } = useConversationStore();
  const { data, isLoading } = useChatbotConversationAllMessages({
    chatbotId,
    conversationId,
  });

  // Effet pour charger les messages initiaux
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

  // Effet pour le scroll automatique
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current;
        const viewport = scrollElement.querySelector(
          "[data-radix-scroll-area-viewport]"
        );

        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    };

    // Scroll immédiatement
    scrollToBottom();

    // Et aussi après un court délai pour s'assurer que le contenu est rendu
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    mutate({
      message: input,
      chatbotId: Number(chatbotId),
      conversationId,
    });

    setInput("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <Card className={`flex flex-col ${className}`}>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 relative">
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="bg-gray-100 p-2 rounded-full">
              <MessageSquare style={{ width: "2rem", height: "2rem" }} />
            </div>
            <h1
              className="font-bold text-gray-100 leading-none"
              style={{ fontSize: "1.725rem" }}
            >
              GUSTAVE
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4`}
                style={{
                  flexDirection:
                    message.sender === "user" ? "row-reverse" : "row",
                }}
              >
                {message.sender === "assistant" ? (
                  <Avatar className="w-8 h-8 bg-secondary flex-shrink-0 justify-center items-center">
                    <Bot className="w-4 h-4 self-center" />
                  </Avatar>
                ) : (
                  <Avatar className="w-8 h-8 bg-primary flex-shrink-0 justify-center items-center">
                    <User className="w-4 h-4 self-center text-white" />
                  </Avatar>
                )}
                <Card
                  className={`p-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.sender === "assistant" && !message.content ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                      <span>Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-line">
                      {message.content}
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t flex gap-4">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1"
          disabled={isPending}
        />
        <Button onClick={handleSend} size="icon" disabled={isPending}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
