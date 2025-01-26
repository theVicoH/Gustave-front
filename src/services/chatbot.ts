import { CreateChatBotBody } from "@/types/chatbot"

export const createChatbot = async ({ name, status }: CreateChatBotBody) => {
  console.log({ name, status })
  const res = await fetch('/api/chatbot/create', {
    method: 'POST',
    body: JSON.stringify({ name, status })
  });

  return res.json();
 };