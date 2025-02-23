import { SendChatbotConversationMessageResponse } from "@/types/chatbot";

export const getPublicConversationMessages = async ({
  chatbotId,
  conversationId,
}: {
  chatbotId: string;
  conversationId: string;
}) => {
  const response = await fetch(
    `/api/chatbot/conversation/public/all-messages-public/${chatbotId}/${conversationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
};

export const sendPublicConversationMessage = async ({
  message,
  chatbotId,
  conversationId,
}: {
  message: string;
  chatbotId: string;
  conversationId: string;
}): Promise<SendChatbotConversationMessageResponse> => {
  const res = await fetch(
    `/api/chatbot/conversation/public/send-message-public`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message, chatbotId, conversationId }),
    }
  );
  return res.json();
};
