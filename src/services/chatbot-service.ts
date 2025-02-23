import ApiService from "@/app/core/web/ApiService";
import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
  Chatbot,
} from "@/types/chatbot";

const api = new ApiService("/api");

export const postCreateChatbot = async (data: CreateChatBotBody) => {
  return api.post<CreateChatbotResponse>("/chatbot/create", data);
};

export const getChatbots = async () => {
  return api.get<Chatbot[]>("/chatbots");
};

export const updateChatbot = async (id: string, data: CreateChatBotBody) => {
  return api.put<Chatbot>(`/chatbot/${id}`, data);
};

export const deleteChatbot = async (id: string) => {
  return api.delete<void>(`/chatbot/${id}`);
};

export const postConversationChatbotMessage = async ({
  message,
  chatbotId,
  conversationId,
}: SendChatbotConversationMessageBody): Promise<SendChatbotConversationMessageResponse> => {
  return api.post<SendChatbotConversationMessageResponse>(
    "/chatbot/conversation/send-message",
    { message, chatbotId, conversationId }
  );
};

export const getConversationChatbotMessage = async ({
  chatbotId,
  conversationId,
}: ChatbotConversationAllMessagesParams): Promise<
  ChatbotConversationAllMessagesResponse[]
> => {
  return api.get<ChatbotConversationAllMessagesResponse[]>(
    `/chatbot/conversation/all-messages/${chatbotId}/${conversationId}`
  );
};

export const downloadChatbotFlyer = async (
  chatbotId: string
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/qrcode/generate/${chatbotId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/pdf",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
          Referer: "http://localhost:3000",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `flyer-${chatbotId}.pdf`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    throw error;
  }
};
