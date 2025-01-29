"use client";

import { columns } from "@/features/table/table-sources/columns";
import { DataTable } from "@/features/table/table-sources/data-table";
import { File } from "@/data/schema";
import { useState, useEffect } from "react";
import { getSources } from "@/services/source.service";
import { useSources } from "@/hooks/use-sources";
import { useUploadFile } from "@/hooks/use-upload-file";

export default function SourcePage() {
  const { data, isLoading } = useSources("1");
  const { mutate: uploadFile } = useUploadFile("1");

  const handleAddFiles = (files: File[]) => {
    for (const file of files) {
      uploadFile(file);
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
