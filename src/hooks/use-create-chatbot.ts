"use client"

import { useMutation } from '@tanstack/react-query';
import { createChatbot } from '@/services/chatbot';
import { ChatbotResponse, CreateChatBotBody } from '@/types/chatbot';
import { useToast } from "@/hooks/use-toast"
import { useChatbotStore } from '@/stores/chatbot-store';

export const useChatbot = () => {
  const { toast } = useToast()
  const setChatbot = useChatbotStore((state) => state.setChatbot)
  return useMutation({
    mutationKey: ['chatbot', 'create'],
    mutationFn: (data: CreateChatBotBody) => createChatbot(data),
    onSuccess: (res: ChatbotResponse) => {
      //TODO: REMOVE THIS
      setChatbot(res.data.attributes)
      toast({
        title: "Success",
        description: "Try to use your chatbot now",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Try again later",
      })
    },
  });
};
