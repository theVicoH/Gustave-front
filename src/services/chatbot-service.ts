import {
  CreateChatbotResponse,
  CreateChatBotBody,
  SendChatbotConversationMessageResponse,
  SendChatbotConversationMessageBody,
  ChatbotConversationAllMessagesParams,
  ChatbotConversationAllMessagesResponse,
  Chatbot,
} from "@/types/chatbot";

export async function getCsrfTokens(): Promise<CsrfTokens> {
  // Vérifier si on a déjà des tokens valides
  const existingTokens = localStorage.getItem("csrf_tokens");
  const expiration = localStorage.getItem("csrf_tokens_expiration");

  if (existingTokens && expiration && Date.now() < parseInt(expiration)) {
    return {
      xsrfToken: existingTokens.split(";")[0],
      sessionToken: existingTokens.split(";")[1],
    };
  }

  // Si pas de tokens ou expirés, en demander de nouveaux
  localStorage.removeItem("csrf_tokens");
  localStorage.removeItem("csrf_tokens_expiration");

  // Récupérer CSRF Token depuis Laravel
  const csrfResponse = await fetch("/sanctum/csrf-cookie", {
    method: "GET",
    credentials: "include",
  });

  if (!csrfResponse.ok) {
    throw new Error("Échec de la récupération du token CSRF");
  }

  const cookies = document.cookie; // Prendre directement les cookies

  const xsrfMatch = cookies.match(/XSRF-TOKEN=[^;]+/);
  const sessionMatch = cookies.match(/gustave_api_session=[^;]+/);

  const tokens = {
    xsrfToken: xsrfMatch ? xsrfMatch[0].split(";")[0] : "",
    sessionToken: sessionMatch ? sessionMatch[0].split(";")[0] : "",
  };

  // Stocker les tokens avec expiration (120 minutes)
  const expiresIn = 120 * 60 * 1000;
  localStorage.setItem(
    "csrf_tokens_expiration",
    (Date.now() + expiresIn).toString()
  );
  localStorage.setItem(
    "csrf_tokens",
    `${tokens.xsrfToken};${tokens.sessionToken}`
  );

  return tokens;
}

function getXsrfToken(): string | null {
  const tokens = localStorage.getItem("csrf_tokens");
  if (!tokens) return null;
  const [xsrfToken] = tokens.split(";");
  return xsrfToken.replace("XSRF-TOKEN=", "");
}

export const postCreateChatbot = async (data: CreateChatBotBody) => {
  const { xsrfToken, sessionToken } = await getCsrfTokens(); // on récupère les tokens

  const response = await fetch("/api/chatbot/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken || "", // envoie X-XSRF-TOKEN dans les headers
      Cookie: `XSRF-TOKEN=${xsrfToken}; gustave_api_session=${sessionToken}`, // envoie les cookies dans la requête
    },
    credentials: "include", // Utilisation de "include" pour envoyer les cookies avec la requête
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
