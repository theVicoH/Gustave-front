import { File } from "@/data/schema";
import ApiService from '@/app/core/web/ApiService';

const apiService = new ApiService(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

interface ApiSourceResponse {
  data: {
    attributes: {
      id: string;
      original_name: string;
      extension: string;
      size: number;
      created_at: string;
    };
  };
}

interface DeleteFileResponse {
  success: boolean;
  message: string;
}

export const getSources = async (chatbotId: string): Promise<File[]> => {
  try {
    const result = await apiService.get<ApiSourceResponse[]>(`/api/files/${chatbotId}`, {
      headers: {
        'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }
    });

    return result.map((item: ApiSourceResponse) => ({
      id: item.data.attributes.id,
      name: item.data.attributes.original_name,
      type: item.data.attributes.extension,
      size: item.data.attributes.size,
      uploadedAt: item.data.attributes.created_at,
      status: "ready"
    }));
  } catch (error) {
    console.error("Error fetching sources:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch sources: ${error.message}`);
    }
    throw new Error('Failed to fetch sources');
  }
};

export const deleteFile = async (fileId: string): Promise<DeleteFileResponse> => {
  console.log('fileId', fileId);
  try {
    const response = await apiService.delete<DeleteFileResponse>(`/api/file/${fileId}`, {
      headers: {
        'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }
    });

    if (response.status === 200 || response.status === 404) {
      return {
        success: true,
        message: "Le fichier a bien été supprimé",
      };
    }
    return response;
  } catch (error) {
    console.error("Delete error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
    throw new Error('Failed to delete file');
  }
};
