import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/services/upload.service";
import { toast } from "react-hot-toast";

export function useUploadFile(chatbotId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadFile(file, chatbotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources", chatbotId] });
      toast.success("Fichier téléchargé avec succès!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
