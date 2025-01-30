"use client";

import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadFile } from "@/hooks/use-upload-file";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const { mutate: uploadFile, isSuccess } = useUploadFile("3");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        for (const file of acceptedFiles) {
          await uploadFile(file);
        }
        if (isSuccess) {
          onUpload(acceptedFiles);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [uploadFile, onUpload, isSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="h-[800px] flex items-center justify-center p-6">
      <div
        {...getRootProps()}
        className="border border-dashed border-gray-300 rounded-lg w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
          <Upload className="h-10 w-10 text-gray-400" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-medium">
            {isDragActive
              ? "Déposez les fichiers ici"
              : "Glissez & déposez des fichiers ici, ou cliquez pour sélectionner"}
          </p>
          <p className="text-sm text-gray-500">
            Nous supportons uniquement les fichiers PDF
          </p>
        </div>
      </div>
    </div>
  );
}
