"use client"

import { useMutation } from '@tanstack/react-query';
import { createChatbot } from '@/services/chatbot';
import { CreateChatBotBody } from '@/types/chatbot';
import { useToast } from "@/hooks/use-toast"

export const useChatbot = () => {
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['chatbot', 'create'],
    mutationFn: (data: CreateChatBotBody) => createChatbot(data),
    onSuccess: () => {
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
