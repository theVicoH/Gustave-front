import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import TypingIndicator from "./typing-indicator";
import { Message } from "@/types/chat.types";

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const isBot = message.senderId === 2;

  return (
    <div
      className={cn(
        "flex gap-2 p-2 md:p-4",
        !isBot ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={cn(
          "h-6 w-6 md:h-8 md:w-8 rounded-full shrink-0 flex items-center justify-center",
          !isBot
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-gradient-to-r from-neutral-500 to-neutral-600"
        )}
      >
        {!isBot ? (
          <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
        ) : (
          <Bot className="h-3 w-3 md:h-4 md:w-4 text-white" />
        )}
      </Avatar>
      <div
        className={cn(
          "rounded-2xl px-3 py-2 md:px-4 md:py-2 max-w-[85%] break-words",
          !isBot
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-muted",
          !isBot ? "rounded-tr-sm" : "rounded-tl-sm"
        )}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <p className="text-sm leading-relaxed">{message.message}</p>
        )}
      </div>
    </div>
  );
}
