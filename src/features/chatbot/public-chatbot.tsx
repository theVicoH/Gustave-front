"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function PublicChatbot() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a placeholder response.This is a placeholder response Integrate your actual API call here.Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?Comment puis-je vous aider aujourd'hui ?",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[800px] mx-auto">
      <div className="flex items-center justify-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">GUSTAVE</h1>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-8 h-full">
        <div className="flex flex-col space-y-8  h-full gap-4">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-fade-in-up">
              <div className="flex flex-col h-full items-center justify-center ">
                <div className="bg-gray-800 p-4 rounded-full  ">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white mb-2">
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
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-5 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-black text-white"
                      : "bg-black text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
              </div>
              <div className="bg-gray-700 rounded-lg px-4 py-2.5">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-700 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-[800px] mx-auto"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-gray-700 border-gray-700  placeholder:text-gray-400 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#2563eb] hover:bg-blue-700 text-white px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
