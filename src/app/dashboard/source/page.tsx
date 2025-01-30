"use client";

import { columns } from "@/features/table/table-sources/columns";
import { DataTable } from "@/features/table/table-sources/data-table";
import { File } from "@/data/schema";
import { useState, useEffect } from "react";
import { getSources } from "@/services/source.service";
import { useSources } from "@/hooks/use-sources";
import { useUploadFile } from "@/hooks/use-upload-file";

export default function SourcePage() {
  const { data, isLoading } = useSources("3");
  const { mutate: uploadFile } = useUploadFile("3");

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
