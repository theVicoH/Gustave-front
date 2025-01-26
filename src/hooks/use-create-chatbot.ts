"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateChatbotResponse, CreateChatBotBody } from "@/types/chatbot";
import { useToast } from "@/hooks/use-toast";
import { useChatbotStore } from "@/stores/chatbot-store";
import { postCreateChatbot } from "@/services/chatbot-service";

const useCreateChatbot = (): UseMutationResult<CreateChatbotResponse, Error, CreateChatBotBody> => {
  const { toast } = useToast();
  const setChatbot = useChatbotStore((state) => state.setChatbot);
  
  return useMutation({
    mutationKey: ["chatbot", "create"],
    mutationFn: (data: CreateChatBotBody) => postCreateChatbot(data),
    onSuccess: (res: CreateChatbotResponse) => {
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