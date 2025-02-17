import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Referer: "http://localhost:3000/",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    const cookies = response.headers.get("set-cookie");
    console.log("Route - Cookies bruts reçus du Laravel:", cookies);

    const newResponse = NextResponse.json({
      success: true,
      cookies: cookies,
    });

    if (cookies) {
      const cookieStrings = cookies.split(/,(?=[^,]+=)/);
      cookieStrings.forEach((cookie) => {
        // Forcer le Path=/ pour rendre les cookies disponibles globalement
        const fixedCookie = cookie.trim().replace(/Path=\/[^;]*/gi, "Path=/");
        newResponse.headers.append("set-cookie", fixedCookie);
      });
    }

    return newResponse;
  } catch (error) {
    console.error("CSRF error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
