import { NextApiService } from "@/app/core/api/NextApiService";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const api = new NextApiService();
    const body = await req.json();

    return await api.put(
      `/update/chatbot/${params.id}`,
      body,
      {
        headers: {
          'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        }
      },
      req
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du chatbot:", error);
    return Response.json(
      { error: "Une erreur est survenue lors de la mise à jour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const api = new NextApiService();

    return await api.delete(
      `/delete/chatbot/${params.id}`,
      {
        headers: {
          'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        }
      },
      req
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du chatbot:", error);
    return Response.json(
      { error: "Une erreur est survenue lors de la suppression" },
      { status: 500 }
    );
  }
}
