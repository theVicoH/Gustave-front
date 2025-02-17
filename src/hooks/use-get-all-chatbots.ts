import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatbots } from "@/services/chatbot-service";
import { useChatbotStore } from "@/stores/chatbot-store";

export function useGetAllChatbots() {
  const setChatbots = useChatbotStore((state: any) => state.setChatbots);

  return useQuery({
    queryKey: ["chatbots"],
    queryFn: async () => {
      const response = await getChatbots();
      // Transformer les données pour avoir la bonne structure
      const chatbotsData = response.chatbots.map((item: any) => ({
        id: item.data.attributes.id,
        name: item.data.attributes.name,
        status: item.data.attributes.status,
        active: item.data.attributes.active,
        createdAt: item.data.attributes.created_at,
        updatedAt: item.data.attributes.updated_at,
      }));
      setChatbots(chatbotsData);
      return chatbotsData;
    },
    refetchOnWindowFocus: false,
  });
}
