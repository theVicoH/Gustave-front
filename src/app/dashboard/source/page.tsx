"use client";

import { columns } from "@/features/table/table-sources/columns";
import { DataTable } from "@/features/table/table-sources/data-table";
import { File } from "@/data/schema";
import { useSources } from "@/hooks/use-sources";
import { useUploadFile } from "@/hooks/use-upload-file";
import { useChatbotStore } from "@/stores/chatbot-store";

export default function SourcePage() {
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);
  const { data, isLoading } = useSources(selectedChatbotId || "");
  const { mutate: uploadFile } = useUploadFile(selectedChatbotId || "");

  if (!selectedChatbotId) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500">Veuillez sélectionner un chatbot</p>
      </div>
    );
  }

  const handleAddFiles = async (files: File[]) => {
    for (const file of files) {
      await uploadFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sources</h1>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        onUpload={handleAddFiles}
        isLoading={isLoading}
      />
    </div>
  );
}
