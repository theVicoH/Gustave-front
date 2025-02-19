import { CreateChatBotBody, CreateChatbotResponse } from "@/types/chatbot";
import { NextResponse } from "next/server";
import { extractCookies } from "@/utils/cookies";

export async function POST(req: Request) {
  try {
    const headers = Object.fromEntries(req.headers);
    const { combinedCookies, xsrfToken } = extractCookies(headers);

    const body = (await req.json()) as CreateChatBotBody;

    console.log("\n\n㊙️㊙️ === DÉBUT CREATE CHATBOT ===");
    console.log("Cookies avant la requête:", combinedCookies);
    console.log("XSRF Token:", xsrfToken);

    const createRes = await fetch(`${process.env.API_URL}/create/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: combinedCookies,
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
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

    // Transmettre les cookies dans la réponse UNIQUEMENT si la requête est réussie
    const newCookies = createRes.headers.get("set-cookie");
    console.log("🫱‍🫲🫱‍🫲 Nouveaux cookies après la requête:", newCookies);

    if (createRes.ok && newCookies) {
      const cookieStrings = newCookies.split(/,(?=\s*[A-Za-z0-9_-]+=)/);
      cookieStrings.forEach((cookie) => {
        const fixedCookie = cookie.trim().replace(/Path=\/(?!;)/g, "Path=/;");
        response.headers.append("set-cookie", fixedCookie);
        console.log("🫱🫱‍🫲 Fixed cookie:", fixedCookie);
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
