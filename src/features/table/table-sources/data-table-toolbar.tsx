"use client";

import {
  Cross2Icon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import React from "react";
import { toast } from "react-hot-toast";
import { useUploadFile } from "@/hooks/use-upload-file";
import { useChatbotStore } from "@/stores/chatbot-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/features/table/table-sources/data-table-view-options";
import { DataTableSelect } from "@/features/table/table-sources/data-table-select";

import { statuses } from "@/data/data";
import { DataTableFacetedFilter } from "@/features/table/table-sources/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onUpload?: (files: File[]) => void;
}

export function DataTableToolbar<TData>({
  table,
  onUpload,
}: DataTableToolbarProps<TData>) {
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);
  const { mutate: uploadFile } = useUploadFile(selectedChatbotId || "");
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      try {
        const files = Array.from(event.target.files);

        for (const file of files) {
          if (file.type !== "application/pdf") {
            toast.error("Seuls les fichiers PDF sont autorisés");
            event.target.value = "";
            return;
          }
        }

        for (const file of files) {
          uploadFile(file);
        }
      } catch (error) {
        console.error(error);
      }
      event.target.value = "";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableSelect table={table} />
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un fichier..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] pl-8"
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
          accept=".pdf"
        />
        <Button
          variant="outline"
          className="h-8 px-2 lg:px-3 ml-auto"
          onClick={() => fileInputRef.current?.click()}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter un fichier
        </Button>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
