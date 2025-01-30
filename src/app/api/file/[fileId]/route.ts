import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    const response = await fetch(`${process.env.API_URL}/file/${fileId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Si c'est 204, pas besoin de parser le JSON
    if (response.status === 204) {
      return NextResponse.json({
        success: true,
        message: "Le fichier a bien été supprimé",
      });
    }

    // Pour les autres statuts, on essaie de parser le JSON
    const data = await response.json();

    if (response.ok || response.status === 404) {
      return NextResponse.json({
        success: true,
        message: "Le fichier a bien été supprimé",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Le fichier n'a pas pu être supprimé",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Le fichier n'a pas pu être supprimé",
      },
      { status: 500 }
    );
  }
}
