"use client";

import * as React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryTable } from "@/features/categories/components/CategoryTable";
import { CategoryDialog } from "@/features/categories/components/CategoryDialog";
import { useDebounce } from "@/hooks/useDebounce";

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Reset page when search changes
  React.useEffect(() => {
    React.startTransition(() => {
      setPage(1);
    });
  }, [debouncedSearch]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Categories</h1>
          <p className="text-sm text-zinc-500 mt-1">Kelola kategori produk percetakan anda.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl shadow-lg shadow-primary/20">
          <Plus className="mr-2 size-4" /> Add Category
        </Button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 pr-4 w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-primary transition-all outline-none"
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <CategoryTable 
        search={debouncedSearch}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* DIALOG SECTION */}
      <CategoryDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
}
