import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const columnHelper = createColumnHelper<Category>();

export const categoryColumns = [
  columnHelper.accessor("name", {
    header: "Category Name",
    cell: (info) => <span className="font-semibold text-zinc-900 dark:text-zinc-100">{info.getValue()}</span>,
  }),
  columnHelper.accessor("slug", {
    header: "Slug",
    cell: (info) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] font-medium border border-zinc-200/50 dark:border-zinc-700/50">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => <span className="text-zinc-500 max-w-xs truncate block">{info.getValue() || "-"}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit2 className="size-3.5 text-zinc-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    ),
  }),
];
