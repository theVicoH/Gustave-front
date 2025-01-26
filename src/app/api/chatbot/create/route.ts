import { CreateChatBotBody, CreateChatbotResponse } from "@/types/chatbot";

export async function POST(req: Request) {
  const body = await req.json() as CreateChatBotBody;
  
  const res = await fetch(`${process.env.API_URL}/create/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: body.name,
      status: body.status
    })
  });
  
  const data = await res.json() as CreateChatbotResponse;
  return Response.json(data);
}