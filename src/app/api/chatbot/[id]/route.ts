export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const headers = Object.fromEntries(req.headers);

  const res = await fetch(
    `${process.env.API_URL}/update/chatbot/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: headers["cookie"] || "",
        "X-XSRF-TOKEN": headers["x-xsrf-token"] || "",
        Referer: "http://localhost:3000",
      },
      credentials: "include",
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
  const headers = Object.fromEntries(req.headers);

  const res = await fetch(
    `${process.env.API_URL}/delete/chatbot/${params.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: headers["cookie"] || "",
        "X-XSRF-TOKEN": headers["x-xsrf-token"] || "",
        Referer: "http://localhost:3000",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  return Response.json(data);
}
