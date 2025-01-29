import { File } from "@/data/schema";

export const getSources = async (chatbotId: string): Promise<File[]> => {
  try {
    const response = await fetch(`/api/files/${chatbotId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch sources");
    }

    const result = await response.json();
    // Transformer la réponse pour correspondre à notre structure
    return result.map((item: any) => ({
      id: item.data.attributes.id,
      name: item.data.attributes.original_name,
      type: item.data.attributes.extension,
      size: item.data.attributes.size,
      uploadedAt: item.data.attributes.created_at,
      status: "ready", // ou gérer selon un attribut de l'API
    }));
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error;
  }
};
