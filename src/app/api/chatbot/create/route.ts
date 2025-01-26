export async function POST(req: Request) {
  const body = await req.json();
  
  const res = await fetch(`${process.env.API_URL}/create/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: body.name,
      status: "public"
    })
  });
 
  return Response.json(await res.json());
 }