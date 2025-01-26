export async function POST(req: Request) {
  const formData = await req.formData();
  
  const file = formData.get('file');
  const type = formData.get('type')?.toString() ?? '';
  const relationship = formData.get('relationship')?.toString() ?? '';
  const chatbotId = formData.get('chatbot_id')?.toString() ?? '';

  if (!file || !(file instanceof File)) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const data = new FormData();
  data.append('file', file);
  data.append('type', type);
  data.append('relationship', relationship);
  data.append('chatbot_id', chatbotId);

  const res = await fetch(`${process.env.API_URL}/upload`, {
    method: 'POST',
    body: data
  });

  return Response.json(await res.json());
}