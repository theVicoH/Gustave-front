"use client";

import { useMutation } from "@tanstack/react-query";
import { CreateChatbotResponse, CreateChatBotBody } from "@/types/chatbot";
import { useToast } from "@/hooks/use-toast";
import { useChatbotStore } from "@/stores/chatbot-store";
import { createChatbot } from "@/services/chatbot-service";

const useCreateChatbot = () => {
  const { toast } = useToast();
  const setChatbot = useChatbotStore((state) => state.setChatbot);
  return useMutation({
    mutationKey: ["chatbot", "create"],
    mutationFn: (data: CreateChatBotBody) => createChatbot(data),
    onSuccess: (res: CreateChatbotResponse) => {
      //TODO: REMOVE THIS
      setChatbot(res.data.attributes);
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
};

export default useCreateChatbot;