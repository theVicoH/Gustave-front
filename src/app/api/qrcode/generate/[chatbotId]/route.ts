import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";

export async function POST(
  req: Request,
  { params }: { params: { chatbotId: string } }
) {
  try {
    const { chatbotId } = await params;
    console.log("🎯 API Route - chatbotId:", chatbotId);

    const api = new NextApiService();
    const response = await api.request(
      `/qrcode/generate/${chatbotId}`,
      "POST",
      {
        headers: {
          Accept: "application/pdf",
          Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        },
        rawResponse: true,
      },
      null,
      req
    );

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const pdfBuffer = await response.clone().arrayBuffer();
    console.log("📄 PDF Buffer size:", pdfBuffer.byteLength);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="flyer-${chatbotId}.pdf"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("❌ Error in API route:", error);
    return NextResponse.json(
      { error: "Error generating QR code" },
      { status: 500 }
    );
  }
}
