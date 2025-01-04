"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import MessageInput from "./message-input";
import QuickPrompts from "./quick-prompts";
import { chats } from "@/components/partials/header/data";
import { generateMessageId } from "@/lib/utils";
import type { Message } from "@/types/chat.types";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(chats[0].chat);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = message) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: generateMessageId(),
      message: text,
      time: new Date().toISOString(),
      senderId: 11, // ID de l'utilisateur actuel
      replayMetadata: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Simuler la réponse du bot
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: generateMessageId(),
        message: "Je suis là pour vous aider. Que souhaitez-vous savoir ?",
        time: new Date().toISOString(),
        senderId: 2, // ID du bot
        replayMetadata: false,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 2000);
  };

  const handlePromptSelect = (promptText: string) => {
    handleSend(promptText);
  };

  return (
    <div className="flex flex-col h-[calc(90vh-2rem)] bg-background">
      <header className="border-b p-4 flex items-center justify-between bg-card">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Assistant IA
        </h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </header>

      <ScrollArea className="flex-1 p-2 md:p-4">
        {" "}
        <div className="max-w-3xl mx-auto space-y-2 md:space-y-4">
          {" "}
          <div className="hidden md:block">
            {" "}
            <QuickPrompts onSelectPrompt={handlePromptSelect} />
          </div>
          {messages.map((msg) => (
            <ChatMessage key={msg.id || msg.time} message={msg} />
          ))}
          {isTyping && (
            <ChatMessage
              message={{
                id: "typing",
                message: "",
                time: new Date().toISOString(),
                senderId: 2,
                replayMetadata: false,
              }}
              isTyping={true}
            />
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-card/50 p-4">
        <div className="max-w-3xl mx-auto">
          <MessageInput
            message={message}
            setMessage={setMessage}
            handleSend={() => handleSend()}
          />
        </div>
      </div>
    </div>
  );
}
