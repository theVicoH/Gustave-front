import { NextApiService } from "@/app/core/api/NextApiService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const api = new NextApiService();

    return await api.post('/login', body, {
      useWebEnvironment: true
    }, request);
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { 
        status: "error",
        message: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion"
      },
      { status: error instanceof Error ? (error as any).status || 500 : 500 }
    );
  }
}
