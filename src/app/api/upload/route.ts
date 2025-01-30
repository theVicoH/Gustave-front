import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type")?.toString() ?? "source";
    const relationship = formData.get("relationship")?.toString() ?? "chatbot";
    const chatbotId = formData.get("chatbot_id")?.toString() ?? "1";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Vérification du type de fichier
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("type", type);
    newFormData.append("relationship", relationship);
    newFormData.append("chatbot_id", chatbotId);

    const response = await fetch(`${process.env.API_URL}/upload`, {
      method: "POST",
      body: newFormData,
    });

    const data = await response.json();

    // Si la réponse n'est pas ok, on renvoie l'erreur avec le bon status
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
