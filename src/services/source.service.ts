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

export const deleteFile = async (fileId: string) => {
  try {
    const response = await fetch(`/api/file/${fileId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    // On vérifie si la réponse est un succès (200) ou si le fichier n'existe pas (404)
    if (response.status === 200 || response.status === 404) {
      return {
        success: true,
        message: "Le fichier a bien été supprimé",
      };
    }

    // Pour les autres codes d'erreur (500, etc.)
    throw new Error(data.message || "Le fichier n'a pas pu être supprimé");
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};
