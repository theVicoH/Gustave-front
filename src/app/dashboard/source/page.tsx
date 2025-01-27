"use client";

import { columns } from "@/features/table/table-sources/columns";
import { DataTable } from "@/features/table/table-sources/data-table";
import { File } from "@/data/schema";
import { useState } from "react";

export default function SourcePage() {
  const [data, setData] = useState<File[]>([]);

  const handleAddFiles = (files: File[]) => {
    // Convertir les fichiers en format attendu
    const newFiles: File[] = files.map((file) => ({
      id: Math.random().toString(),
      name: file.name,
      type: file.name.split(".").pop() || "",
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "processing" as const,
    }));

    setData((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sources</h1>
      </div>
      <DataTable columns={columns} data={data} onUpload={handleAddFiles} />
    </div>
  );
}
