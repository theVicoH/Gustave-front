import {
  SendChatbotConversationMessageResponse,
  ChatbotConversationAllMessagesResponse,
} from "@/types/chatbot";

export const getPublicConversationMessages = async (): Promise<
  ChatbotConversationAllMessagesResponse[]
> => {
  const res = await fetch(
    `/api/chatbot/conversation/public/all-messages-public`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return res.json();
};

export const sendPublicConversationMessage = async ({
  message,
}: {
  message: string;
}): Promise<SendChatbotConversationMessageResponse> => {
  const res = await fetch(
    `/api/chatbot/conversation/public/send-message-public`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );
  return res.json();
};
