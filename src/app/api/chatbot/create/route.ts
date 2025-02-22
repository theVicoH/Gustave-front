import { CreateChatBotBody, CreateChatbotResponse } from "@/types/chatbot";
import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";

export async function POST(request: Request) {
  try {
    console.log("\n\n㊙️㊙️ === DÉBUT CREATE CHATBOT ===");
    
    const body = (await request.json()) as CreateChatBotBody;
    const api = new NextApiService;

    return await api.post<CreateChatbotResponse>(
      '/create/chatbot', 
      body,
      {
        headers: {
          'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        }
      },
      request
    );

  } catch (error) {
    console.error("Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du chatbot" },
      { status: error instanceof Error ? (error as any).status || 500 : 500 }
    );
  }
}
