import { useMutation } from "@tanstack/react-query";
import { downloadChatbotFlyer } from "@/services/chatbot-service";
import { toast } from "react-hot-toast";

export function useDownloadFlyer() {
  return useMutation({
    mutationFn: downloadChatbotFlyer,
    onError: () => {
      toast.error("Impossible de télécharger le flyer", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    },
    onSuccess: () => {
      toast.success("Flyer téléchargé avec succès", {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    },
  });
}
