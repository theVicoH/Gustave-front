import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { chatbotId: string } }
) {
  try {
    const { chatbotId } = params;

    const response = await fetch(
      `${process.env.API_ENVIRONMENT_URL}/sources/${chatbotId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 }
    );
  }
}
