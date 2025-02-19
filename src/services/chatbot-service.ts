import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
  Chatbot,
} from "@/types/chatbot";

export const postCreateChatbot = async (data: CreateChatBotBody) => {
  console.log("Cookies avant création:", document.cookie);
  const response = await fetch("/api/chatbot/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  console.log("Cookies après création:", document.cookie);
  return response.json();
};

export const getChatbots = async () => {
  console.log("Cookies avant récupération:", document.cookie);
  const response = await fetch("/api/chatbots", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log("Cookies après récupération:", document.cookie);
  return data;
};

export const updateChatbot = async (id: string, data: CreateChatBotBody) => {
  console.log("Cookies avant mise à jour:", document.cookie);
  const response = await fetch(`/api/chatbot/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  console.log("Cookies après mise à jour:", document.cookie);

  if (!response.ok) {
    throw new Error("Failed to update chatbot");
  }

  return response.json();
};

export const deleteChatbot = async (id: string) => {
  console.log("Cookies avant suppression:", document.cookie);
  const response = await fetch(`/api/chatbot/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });
  console.log("Cookies après suppression:", document.cookie);
  return response.json();
};

console.log(document.cookie);
export const postConversationChatbotMessage = async ({
  message,
  chatbotId,
  conversationId,
}: SendChatbotConversationMessageBody): Promise<SendChatbotConversationMessageResponse> => {
  console.log("Cookies avant envoi message:", document.cookie);
  const res = await fetch(`/api/chatbot/conversation/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message, chatbotId, conversationId }),
  });
  console.log("Cookies après envoi message:", document.cookie);
  return res.json();
};

export const getConversationChatbotMessage = async ({
  chatbotId,
  conversationId,
}: ChatbotConversationAllMessagesParams): Promise<
  ChatbotConversationAllMessagesResponse[]
> => {
  console.log("Cookies avant récupération messages:", document.cookie);
  const res = await fetch(
    `/api/chatbot/conversation/all-messages/${chatbotId}/${conversationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }
  );
  console.log("Cookies après récupération messages:", document.cookie);
  return res.json();
};
