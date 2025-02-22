import ApiService from '@/app/core/web/ApiService';

const apiService = new ApiService(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

interface UploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function uploadFile(file: File, chatbotId: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "source");
  formData.append("relationship", "chatbot");
  formData.append("chatbot_id", chatbotId);

  try {
    const response = await apiService.post<UploadResponse>('/api/upload', formData, {
      headers: {
        'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }
    });

    return response;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
  }
}
