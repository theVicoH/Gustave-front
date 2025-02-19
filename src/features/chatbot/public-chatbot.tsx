"use client";

import { useState, useEffect, useRef } from "react";
import {
  usePublicChatbotMessages,
  useSendPublicChatbotMessage,
} from "@/hooks/use-public-chatbot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePublicConversationStore } from "@/stores/public-chatbot-conversation-store";

export function PublicChatbot({
  title = "Chatbot",
  placeholder = "Ask anything.",
  className,
  chatbotId = "6",
  conversationId = "aec85fd4-3e19-4f6a-b08e-fc0e1f6aedd5",
}: {
  title?: string;
  placeholder?: string;
  className?: string;
  chatbotId?: string;
  conversationId?: string;
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { mutate, isPending } = useSendPublicChatbotMessage();
  const { messages, resetMessages, addMessage } = usePublicConversationStore();
  const { data, isLoading } = usePublicChatbotMessages({
    chatbotId,
    conversationId,
  });

  useEffect(() => {
    if (data?.chatbots) {
      console.log("Messages reçus:", data.chatbots);
      resetMessages();

      data.chatbots.forEach((item) => {
        if (item.data?.attributes) {
          const { user_message, assistant_message } = item.data.attributes;
          if (user_message) {
            addMessage("user", user_message);
          }
          if (assistant_message) {
            addMessage("assistant", assistant_message);
          }
        }
      });
    }
  }, [data, addMessage, resetMessages]);

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
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage = input;
    setInput("");
    addMessage("user", userMessage);

    mutate(
      { message: userMessage, chatbotId, conversationId },
      {
        onSuccess: (response) => {
          if (response.data?.attributes?.message?.content) {
            addMessage("assistant", response.data.attributes.message.content);
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className={`flex flex-col ${className} border-0`}>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="bg-muted p-2 rounded-full">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">GUSTAVE</h1>
          </div>
        ) : (
          messages.map((message, i) => (
            <div
              key={i}
              className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 w-[10vw] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 flex gap-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </Button>
      </form>
    </Card>
  );
}
