import { CreateChatBotBody, CreateChatbotResponse } from "@/types/chatbot";
import { NextResponse } from "next/server";
import { extractCookies } from "@/utils/cookies";

export async function POST(req: Request) {
  try {
    // Vérifier les cookies envoyés avec la requête
    const cookies = req.headers.get("cookie") ?? "";
    const xsrfTokenMatch = cookies.match(/XSRF-TOKEN=([^;]*)/);
    const sessionTokenMatch = cookies.match(/gustave_api_session=([^;]*)/);

    if (!xsrfTokenMatch || !sessionTokenMatch) {
      throw new Error("Les tokens CSRF sont manquants");
    }

    const xsrfToken = decodeURIComponent(xsrfTokenMatch[1]);
    const sessionToken = decodeURIComponent(sessionTokenMatch[1]);

    const body = (await req.json()) as CreateChatBotBody;

    // Effectuer la requête de création du chatbot avec les tokens CSRF
    const createRes = await fetch(`${process.env.API_URL}/create/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
        Cookie: `gustave_api_session=${sessionToken}`,
        Referer: "http://localhost:3000",
      },
      credentials: "include",
      body: JSON.stringify({
        name: body.name,
        status: body.status,
      }),
    });

    const data = (await createRes.json()) as CreateChatbotResponse;

    const response = NextResponse.json(
      !createRes.ok
        ? { error: data.message || "Erreur lors de la création du chatbot" }
        : data,
      { status: createRes.ok ? 200 : createRes.status }
    );

    // Transmettre les cookies dans la réponse
    const newCookies = createRes.headers.get("set-cookie");
    if (newCookies) {
      const cookieStrings = newCookies.split(/,(?=[^,]+=)/);
      cookieStrings.forEach((cookie) => {
        const fixedCookie = cookie.trim().replace(/Path=\/.+?/gi, "Path=/");
        response.headers.append("set-cookie", fixedCookie);
      });
    }

    return response;
  } catch (error) {
    console.error("Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du chatbot" },
      { status: 500 }
    );
  }
}
