import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";

export async function GET(_: Request, { params }: { params: { chatbotId: string } }) {
  try {
    const { chatbotId } = params;
    const api = new NextApiService();

    return await api.get(`/files/${chatbotId}`);
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
