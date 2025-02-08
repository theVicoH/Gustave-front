"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCreateChatbot from "@/hooks/use-create-chatbot";
import { useUpdateChatbot } from "@/hooks/use-update-chatbot";
import { ChatbotStatus } from "@/types/chatbot";
import { useChatbotStore } from "@/stores/chatbot-store";

interface CreateChatbotFormProps {
  onSuccess?: () => void;
  onSubmitStarted?: () => void;
  chatbotId?: string;
  isEditing?: boolean;
}

export default function CreateChatbotForm({
  onSuccess,
  onSubmitStarted,
  chatbotId,
  isEditing = false,
}: CreateChatbotFormProps) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { mutate: createMutate, isSubmitting: isCreating } = useCreateChatbot();
  const { mutate: updateMutate, isSubmitting: isUpdating } = useUpdateChatbot(
    chatbotId || ""
  );
  const chatbots = useChatbotStore((state) => state.chatbots);

  useEffect(() => {
    if (isEditing && chatbotId) {
      const chatbot = chatbots.find((bot) => bot.id.toString() === chatbotId);
      if (chatbot) {
        setName(chatbot.name);
        setIsPublic(chatbot.status === "public");
      }
    }
  }, [isEditing, chatbotId, chatbots]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitStarted?.();

    const data = {
      name,
      status: isPublic ? "public" : ("privé" as ChatbotStatus),
    };

    if (isEditing && chatbotId) {
      updateMutate(data, {
        onSuccess: () => {
          onSuccess?.();
          setName("");
          setIsPublic(true);
        },
      });
    } else {
      createMutate(data, {
        onSuccess: () => {
          onSuccess?.();
          setName("");
          setIsPublic(true);
        },
      });
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Bot Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter bot name"
          className="w-full"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="status">Public Access</Label>
        <Switch id="status" checked={isPublic} onCheckedChange={setIsPublic} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
          ? "Update Bot"
          : "Create Bot"}
      </Button>
    </form>
  );
}
