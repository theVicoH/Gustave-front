"use client";

import { useState } from "react";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}

interface ChatbotProps {
  title?: string;
  placeholder?: string;
  className?: string;
}

export function Chatbot({
  title = "Chatbot",
  placeholder = "Ask anything.",
  className,
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content: input, sender: "user" },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          content: "Je suis en train de réfléchir...",
          sender: "bot",
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <Card className={`flex flex-col ${className}`}>
      <ScrollArea className="flex-1 p-4 relative">
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <div className="bg-gray-100 p-8 rounded-full">
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
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{
                  flexDirection:
                    message.sender === "user" ? "row-reverse" : "row",
                }}
              >
                {message.sender === "bot" ? (
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
                  <p className="text-sm">{message.content}</p>
                </Card>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
