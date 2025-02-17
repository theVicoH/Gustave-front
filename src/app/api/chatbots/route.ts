import { NextResponse } from "next/server";
import { extractCookies } from "@/utils/cookies";

export async function GET(req: Request) {
  try {
    const headers = Object.fromEntries(req.headers);
    const { combinedCookies } = extractCookies(headers);

    console.log("\n\n㊙️㊙️ === DÉBUT GET ALL CHATBOTS ===");
    console.log("Cookies avant la requête:", combinedCookies);

    // Première requête pour récupérer le XSRF-TOKEN
    const xsrfRes = await fetch(`${process.env.API_URL}/sanctum/csrf-cookie`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: combinedCookies,
        Referer: "http://localhost:3000",
      },
      credentials: "include",
    });

    const xsrfToken = xsrfRes.headers
      .get("set-cookie")
      ?.match(/XSRF-TOKEN=([^;]+)/)?.[1];
    console.log("🌟 XSRF-TOKEN récupéré:", xsrfToken);

    // Requête principale avec XSRF-TOKEN
    const res = await fetch(`${process.env.API_URL}/chatbots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: combinedCookies,
        "X-XSRF-TOKEN": xsrfToken || "",
        Referer: "http://localhost:3000",
      },
      credentials: "include",
    });

    const data = await res.json();

    const response = NextResponse.json(data);

    // Récupérer et transmettre les nouveaux cookies
    const newCookies = res.headers.get("set-cookie");
    console.log("🫱‍🫲🫱‍🫲 Nouveaux cookies après la requête:", newCookies);

    if (newCookies) {
      response.headers.set("Set-Cookie", newCookies);
    }

    return response;
  } catch (error) {
    console.error("Erreur finale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des chatbots" },
      { status: 500 }
    );
  }
}
