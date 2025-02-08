export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.API_URL}/update/chatbot/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return Response.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.API_URL}/delete/chatbot/${params.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}
