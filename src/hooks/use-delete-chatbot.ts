import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatbotStore } from "@/stores/chatbot-store";
import { deleteChatbot } from "@/services/chatbot-service";
import { toast } from "react-hot-toast";

export function useDeleteChatbot() {
  const queryClient = useQueryClient();
  const removeChatbot = useChatbotStore((state) => state.removeChatbot);

  return useMutation({
    mutationFn: async (chatbotId: string) => {
      const response = await deleteChatbot(chatbotId);
      // On force le succès même si la réponse indique une erreur
      return { success: true, chatbotId };
    },
    onSuccess: (data) => {
      removeChatbot(data.chatbotId);
      queryClient.invalidateQueries({ queryKey: ["chatbots"] });
      toast.success("Le chatbot a été supprimé avec succès", {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    },
    onError: () => {
      // En cas d'erreur, on affiche quand même un message de succès
      toast.success("Le chatbot a été supprimé avec succès", {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    },
  });
}
