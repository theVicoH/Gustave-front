import { NextApiService } from "@/app/core/api/NextApiService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("\n\n㊙️㊙️ === DÉBUT GET ALL CHATBOTS ===");
    
    const api = new NextApiService();
    return await api.get('/chatbots', {
      headers: {
        'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      }
    }, request);

  } catch (error) {
    console.error("Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des chatbots" },
      { status: 500 }
    );
  }
}
