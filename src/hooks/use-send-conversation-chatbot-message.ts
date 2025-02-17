"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { postConversationChatbotMessage } from "@/services/chatbot-service";
import {
  SendChatbotConversationMessageBody,
  SendChatbotConversationMessageResponse,
} from "@/types/chatbot";
import { useConversationStore } from "@/stores/chatbot-conversation-store";

const useSendConversationChatbotMessage = (): UseMutationResult<
  SendChatbotConversationMessageResponse,
  Error,
  SendChatbotConversationMessageBody
> => {
  const { toast } = useToast();
  const { addMessage, updateLastAssistantMessage } = useConversationStore();

  return useMutation({
    mutationKey: ["chatbot", "conversation", "send-message"],
    mutationFn: (data: SendChatbotConversationMessageBody) => {
      addMessage("user", data.message);
      addMessage("assistant", "");
      return postConversationChatbotMessage(data);
    },
    onSuccess: (response) => {
      updateLastAssistantMessage(response.data.attributes.content);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
      });
    },
  });
};

export default useSendConversationChatbotMessage;
