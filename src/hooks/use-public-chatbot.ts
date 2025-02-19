import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPublicConversationMessages,
  sendPublicConversationMessage,
} from "@/services/public-chatbot-service";
import { SendChatbotConversationMessageResponse } from "@/types/chatbot";

// Type pour la réponse de l'API GET
type PublicChatbotMessagesResponse = {
  chatbots: Array<{
    data: {
      attributes: {
        user_message: string;
        assistant_message: string;
        conversation_id: string;
        chatbot_id: number;
        created_at: string;
        updated_at: string;
      };
      relationships: [];
    };
  }>;
};

export function usePublicChatbotMessages() {
  return useQuery({
    queryKey: ["public-chatbot-messages"],
    queryFn: getPublicConversationMessages,
    refetchOnWindowFocus: false,
  });
}

export function useSendPublicChatbotMessage() {
  const queryClient = useQueryClient();

  return useMutation<
    SendChatbotConversationMessageResponse,
    Error,
    { message: string }
  >({
    mutationFn: sendPublicConversationMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["public-chatbot-messages"] });
    },
  });
}
