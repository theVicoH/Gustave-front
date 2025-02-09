import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteFile } from "@/hooks/use-delete-file";
import { useChatbotStore } from "@/stores/chatbot-store";

interface DataTableSelectProps<TData> {
  table: Table<TData>;
}

export function DataTableSelect<TData>({ table }: DataTableSelectProps<TData>) {
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);
  const { mutate: deleteFile } = useDeleteFile(selectedChatbotId || "");
  const selectedRows = table.getSelectedRowModel().rows;

  const handleDeleteSelected = async () => {
    const fileIds = selectedRows.map((row) => row.original.id);
    for (const fileId of fileIds) {
      await deleteFile(fileId);
    }
    table.toggleAllRowsSelected(false);
  };

  return (
    <div className="flex items-center gap-2">
      {selectedRows.length > 0 && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteSelected}
          className="h-8"
        >
          <Trash className="h-4 w-4 mr-2" />
          Supprimer ({selectedRows.length})
        </Button>
      )}
    </div>
  );
}
