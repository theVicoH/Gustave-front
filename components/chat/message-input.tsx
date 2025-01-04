import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSend: () => void;
  disabled?: boolean;
}

export default function MessageInput({
  message,
  setMessage,
  handleSend,
  disabled = false,
}: MessageInputProps) {
  return (
    <div className="relative flex items-end gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        className="min-h-[80px] resize-none bg-background/50 backdrop-blur-sm"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        onClick={handleSend}
        size="icon"
        className={cn(
          "rounded-full bg-primary hover:bg-primary/90",
          !message.trim() && "opacity-50 cursor-not-allowed"
        )}
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
