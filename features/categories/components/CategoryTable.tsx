"use client";
"use no memo";

import { useQuery } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  Pagination
} from "@/components/ui/table";
import { type Category } from "./columns";
import { useCategoryTableData } from "../hooks/useCategoryTable";
import { getCategories } from "../actions";
import { categoryKeys } from "../keys";
import { Loader2 } from "lucide-react";

interface CategoryTableProps {
  search: string;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function CategoryTable({ 
  search, 
  page, 
  pageSize, 
  onPageChange, 
  onPageSizeChange 
}: CategoryTableProps) {
  const { data: response, isLoading } = useQuery({
    queryKey: categoryKeys.list({ search, page, pageSize }),
    queryFn: () => getCategories({ search, page, pageSize }),
  });

  const table = useCategoryTableData(response?.data || []);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      )}
      
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : !isLoading ? (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-32 text-center text-zinc-500">
                Data kategori tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 px-4">
        <Pagination 
          currentPage={page} 
          totalPages={response?.meta.totalPages || 1} 
          onPageChange={onPageChange}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
