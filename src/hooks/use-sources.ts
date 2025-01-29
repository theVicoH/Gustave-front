import { useQuery } from "@tanstack/react-query";
import { getSources } from "@/services/source.service";
import { File } from "@/data/schema";

export function useSources(chatbotId: string) {
  return useQuery<File[]>({
    queryKey: ["sources", chatbotId],
    queryFn: () => getSources(chatbotId),
  });
}
