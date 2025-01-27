"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/features/table/table-sources/data-table-view-options";

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
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && onUpload) {
      onUpload(Array.from(event.target.files));
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Rechercher un fichier..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Statut"
            options={statuses}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={[
              { value: "pdf", label: "PDF" },
              { value: "doc", label: "DOC" },
              { value: "xls", label: "XLS" },
              { value: "img", label: "IMG" },
            ]}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
          accept=".pdf,.docx,.txt,.md,.tex"
        />
        <Button
          variant="outline"
          className="h-8 px-2 lg:px-3"
          onClick={() => fileInputRef.current?.click()}
        >
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
