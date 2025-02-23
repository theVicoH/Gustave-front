import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";

export async function DELETE(
  request: Request,
  context: { params: { fileId: string } }
) {
  try {
    const fileId = await context.params.fileId;
    const api = new NextApiService();

    const response = await api.delete(
      `/file/${fileId}`,
      {
        headers: {
          'Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        }
      },
      request
    );

    // Handle 204 No Content response
    if (response.status === 204 || response.status === 404) {
      return NextResponse.json({
        success: true,
        message: "Le fichier a bien été supprimé"
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Une erreur est survenue lors de la suppression"
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: "Le fichier a bien été supprimé",
      data
    });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Une erreur est survenue lors de la suppression"
      },
      { status: 500 }
    );
  }
}
