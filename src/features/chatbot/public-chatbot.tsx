"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Bot, Send } from "lucide-react";
import { MessageSquare } from "lucide-react";
import {
  usePublicChatbotMessages,
  useSendPublicChatbotMessage,
} from "@/hooks/use-public-chatbot";
import { usePublicConversationStore } from "@/stores/public-chatbot-conversation-store";
import { useParams } from "next/navigation";

export function PublicChatbot() {
  const params = useParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { mutate, isPending } = useSendPublicChatbotMessage();
  const { messages, resetMessages, addMessage } = usePublicConversationStore();

  const chatbotId = params?.chatbotId as string;
  const conversationId = params?.conversationId as string;

  const { data, isLoading } = usePublicChatbotMessages({
    chatbotId,
    conversationId,
  });

  // Vérification des paramètres après les hooks
  if (
    !chatbotId ||
    !conversationId ||
    chatbotId === "undefined" ||
    conversationId === "undefined"
  ) {
    console.log("⚠️ Invalid or missing parameters:", {
      chatbotId,
      conversationId,
    });
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Effet pour charger les messages initiaux
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

  // Effet pour le scroll automatique
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    };

    // Scroll immédiatement
    scrollToBottom();

    // Scroll après un délai pour s'assurer que le contenu est rendu
    const timeoutId = setTimeout(scrollToBottom, 100);

    // Scroll après un délai plus long pour les messages longs
    const longTimeoutId = setTimeout(scrollToBottom, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(longTimeoutId);
    };
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage = input;
    setInput("");
    addMessage("user", userMessage);

    mutate(
      {
        message: userMessage,
        chatbotId,
        conversationId,
      },
      {
        onSuccess: (response) => {
          if (response.data?.attributes?.message?.content) {
            addMessage("assistant", response.data.attributes.message.content);
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-[100vh] max-w-[800px] mx-auto">
      <div className="flex items-center justify-center p-4 border-b md:border-b-0 border-gray-600">
        <h1 className="text-xl font-bold text-white">GUSTAVE</h1>
      </div>

      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 8rem)" }}
      >
        <div className="flex flex-col space-y-8 px-4 py-8">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-fade-in-up">
              <div className="flex flex-col h-full items-center justify-center gap-3">
                <div className="bg-black p-4 rounded-full">
                  <MessageSquare className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    Comment puis-je vous aider aujourd&apos;hui ?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Je suis là pour répondre à vos questions
                  </p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, i) => (
              <div
                key={i}
                className={`h-full flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-slide-in`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-gray-300" />
                  </div>
                )}
                <div
                  className={`rounded-xl max-w-[80%] ${
                    message.role === "user"
                      ? "bg-black px-4 py-2 text-white break-all"
                      : "bg-black px-4 py-3 text-white"
                  }`}
                  style={
                    message.role === "assistant"
                      ? { wordBreak: "break-word" }
                      : {}
                  }
                >
                  <p className="">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isPending && (
            <div className="flex items-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-gray-300" />
              </div>
              <div className="bg-black rounded-lg px-4 py-2.5">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 border-t md:border-t-0 border-gray-600 p-4 bg-[#1E1F20]">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-[800px] mx-auto"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-black text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500"
            disabled={isPending}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="bg-black hover:bg-gray-900 text-white px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
