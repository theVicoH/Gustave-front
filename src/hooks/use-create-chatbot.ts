"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateChatbotResponse, CreateChatBotBody } from "@/types/chatbot";
import { useToast } from "@/hooks/use-toast";
import { useChatbotStore } from "@/stores/chatbot-store";
import { postCreateChatbot } from "@/services/chatbot-service";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useCreateChatbot = () => {
  const { toast } = useToast();
  const addChatbot = useChatbotStore((state) => state.addChatbot);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["chatbot", "create"],
    mutationFn: async (data: CreateChatBotBody) => {
      if (isSubmitting) return null;
      setIsSubmitting(true);
      try {
        const response = await postCreateChatbot(data);
        return response;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: (res: CreateChatbotResponse | null) => {
      if (!res) return;

      addChatbot({
        id: res.data.attributes.id,
        name: res.data.attributes.name,
        platform: "Default",
        status: res.data.attributes.status,
        visibility: "Public",
      });
      queryClient.invalidateQueries({ queryKey: ["chatbots"] });
      toast({
        title: "Success",
        description: "Try to use your chatbot now",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Try again later",
      });
    },
  });

  return {
    ...mutation,
    isSubmitting,
  };
};

export default useCreateChatbot;
