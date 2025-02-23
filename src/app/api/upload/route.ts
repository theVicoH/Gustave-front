import { NextApiService } from "@/app/core/api/NextApiService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const api = new NextApiService();

    return await api.post('/upload', formData, {
      headers: {
        'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      }
    }, request);

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: error instanceof Error ? (error as any).status || 500 : 500 }
    );
  }
}
