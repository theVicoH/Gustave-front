export async function uploadFile(file: File, chatbotId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "source");
  formData.append("relationship", "chatbot");
  formData.append("chatbot_id", chatbotId);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload file");
  }

  return response.json();
}
