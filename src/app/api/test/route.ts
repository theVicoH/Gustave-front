import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:8000/api/test", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Referer: "http://localhost:3000/",
      },
    });

    if (!response.ok) {
      console.error("API test failed with status:", response.status);
      return NextResponse.json(
        { error: "Test request failed", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json(
      { error: "Failed to test CSRF setup", details: error.message },
      { status: 500 }
    );
  }
}
