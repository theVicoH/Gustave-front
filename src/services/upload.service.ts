export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "source");
  formData.append("relationship", "chatbot");
  formData.append("chatbot_id", "1");

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to upload file");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to upload file");
  }
}
