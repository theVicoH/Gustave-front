import { NextApiService } from "@/app/core/api/NextApiService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const api = new NextApiService();
    const body = await request.json();

    const response = await api.post('/register', body, {}, request);
    
    if (response.status === 422) {
      const data = await response.json();
      if (data?.errors?.email) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 422 }
        );
      } else if (data?.errors?.password) {
          return NextResponse.json(
            { error: "Le mot de passe doit contenir au moins 8 caractères" },
            { status: 422 }
          );
        }
    }

    return response;

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
