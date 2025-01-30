import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFile, getSources } from "@/services/source.service";
import { toast } from "react-hot-toast";

export function useDeleteFile(chatbotId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) => {
      const response = await deleteFile(fileId);
      if (response.success) {
        const updatedSources = await getSources(chatbotId);
        return { response, sources: updatedSources };
      }
      throw new Error("Le fichier n'a pas pu être supprimé");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["sources", chatbotId], data.sources);
      toast.success(data.response.message);
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ["sources", chatbotId] });
      toast.error(error.message);
    },
  });
}
