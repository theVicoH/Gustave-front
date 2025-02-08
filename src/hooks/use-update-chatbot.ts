import { useMutation } from "@tanstack/react-query";
import { CreateChatBotBody } from "@/types/chatbot";
import { useToast } from "@/hooks/use-toast";
import { useChatbotStore } from "@/stores/chatbot-store";
import { updateChatbot } from "@/services/chatbot-service";

export const useUpdateChatbot = (id: string) => {
  const { toast } = useToast();
  const updateChatbotInStore = useChatbotStore((state) => state.updateChatbot);

  return useMutation({
    mutationKey: ["chatbot", "update", id],
    mutationFn: async (data: CreateChatBotBody) => {
      const response = await updateChatbot(id, data);
      return response;
    },
    onSuccess: (res) => {
      updateChatbotInStore(id, {
        name: res.data.attributes.name,
        status: res.data.attributes.status,
      });
      toast({
        title: "Success",
        description: "Chatbot updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update chatbot",
      });
    },
  });
};
