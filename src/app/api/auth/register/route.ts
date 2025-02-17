import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers = Object.fromEntries(request.headers);

    // Extraire et nettoyer les cookies
    const cookies = headers["cookie"]?.split(";") || [];
    const uniqueCookies = new Map();

    cookies.forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      uniqueCookies.set(name, cookie.trim());
    });

    const cleanedCookies = Array.from(uniqueCookies.values()).join("; ");

    console.log("=== DÉBUT TRAITEMENT REGISTER API ROUTE ===");
    console.log("1. Headers reçus:", headers);

    const laravelResponse = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cleanedCookies,
        "X-XSRF-TOKEN": headers["x-xsrf-token"] || "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    console.log("2. Réponse Laravel:", {
      status: laravelResponse.status,
      statusText: laravelResponse.statusText,
      headers: Object.fromEntries(laravelResponse.headers.entries()),
    });

    const responseText = await laravelResponse.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    if (!laravelResponse.ok) {
      if (laravelResponse.status === 422 && responseData?.errors?.email) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 422 }
        );
      }
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'inscription" },
        { status: laravelResponse.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("4. Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
