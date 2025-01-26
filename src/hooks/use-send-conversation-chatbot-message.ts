"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { sendConversationChatbotMessage } from "@/services/chatbot-service";
import { SendChatbotConversationMessageBody } from "@/types/chatbot";

const useSendConversationChatbotMessage = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationKey: ["chatbot", "conversaiont", "send-message"],
    mutationFn: (data: SendChatbotConversationMessageBody) => sendConversationChatbotMessage(data),
    onSuccess: () => {
      //TODO: REMOVE THIS
      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    },
    onError: () => {
      //TODO: REMOVE THIS
      toast({
        title: "Error",
        description: "Failed to send message",
      });
    },
  });
};

export default useSendConversationChatbotMessage;