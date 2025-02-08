export async function GET() {
  const res = await fetch(`${process.env.API_URL}/chatbots`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return Response.json(data);
}
