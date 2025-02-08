import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatbotStore } from "@/stores/chatbot-store";
import { deleteChatbot } from "@/services/chatbot-service";
import toast from "react-hot-toast";

export function useDeleteChatbot() {
  const queryClient = useQueryClient();
  const removeChatbot = useChatbotStore((state) => state.removeChatbot);

  return useMutation({
    mutationKey: ["chatbot", "delete"],
    mutationFn: async (chatbotId: string) => {
      const response = await deleteChatbot(chatbotId);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete chatbot");
      }
      return response;
    },
    onSuccess: (_, id) => {
      removeChatbot(id);
      toast.success("Chatbot successfully deleted", {
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#10B981",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#FFFFFF",
        },
      });
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to delete chatbot. Please try again."
      );
    },
  });
}
