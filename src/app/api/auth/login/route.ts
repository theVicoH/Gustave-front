import { NextResponse } from "next/server";

// Fonction utilitaire pour gérer les cookies
function handleCookies(response: NextResponse, laravelCookies: string | null) {
  if (laravelCookies) {
    const cookieStrings = laravelCookies.split(/,(?=[^,]+=)/);
    cookieStrings.forEach((cookie) => {
      response.headers.append("set-cookie", cookie.trim());
    });
  }
  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers = Object.fromEntries(request.headers);

    console.log("=== DÉBUT TRAITEMENT LOGIN API ROUTE ===");
    console.log("1. Headers reçus:", headers);
    console.log("2. Body envoyé:", body);

    const laravelResponse = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "http://localhost:3000",
        Cookie: "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    console.log("3. Status Laravel:", laravelResponse.status);
    console.log(
      "4. Headers Laravel:",
      Object.fromEntries(laravelResponse.headers.entries())
    );

    const laravelCookies = laravelResponse.headers.get("set-cookie");
    console.log("5. Cookies bruts:", laravelCookies);

    if (laravelCookies) {
      const cookieStrings = laravelCookies.split(/,(?=\s*[^=]+=)/);

      // Extraire uniquement la partie token (avant expires)
      const xsrfToken = cookieStrings
        .find((cookie) => cookie.includes("XSRF-TOKEN="))
        ?.split(";")[0];

      const sessionToken = cookieStrings
        .find((cookie) => cookie.includes("gustave_api_session="))
        ?.split(";")[0];

      // Reconstruire la chaîne de cookies sans espace après le point-virgule
      const combinedCookies = `${xsrfToken};${sessionToken}`;
      console.log("9. Cookies combinés:", combinedCookies);
    }

    // Si le statut est 204, on renvoie une réponse vide avec les cookies
    if (laravelResponse.status === 204) {
      const response = NextResponse.json(
        { status: "success", user: { email: body.email } },
        { status: 200 }
      );

      if (laravelCookies) {
        response.headers.set("Set-Cookie", laravelCookies);
      }

      return response;
    }

    // Pour les autres statuts, on continue avec le parsing JSON
    const responseText = await laravelResponse.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    return NextResponse.json(responseData, { status: laravelResponse.status });
  } catch (error) {
    console.error("Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la connexion" },
      { status: 500 }
    );
  }
}
