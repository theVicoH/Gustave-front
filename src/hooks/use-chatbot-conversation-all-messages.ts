"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getConversationChatbotMessage } from "@/services/chatbot-service";
import {
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
} from "@/types/chatbot";

const useChatbotConversationAllMessages = ({
  chatbotId,
  conversationId,
}: ChatbotConversationAllMessagesParams): UseQueryResult<
  ChatbotConversationAllMessagesResponse[],
  Error
> => {
  return useQuery({
    queryKey: [
      "chatbot",
      "conversation",
      "all-messages",
      chatbotId,
      conversationId,
    ],
    queryFn: () => getConversationChatbotMessage({ chatbotId, conversationId }),
  });
};

export default useChatbotConversationAllMessages;
