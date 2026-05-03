"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-between px-2 py-4 gap-4", className)}>
      <div className="flex items-center gap-6">
        <div className="text-sm text-zinc-500 hidden sm:block">
          Page <span className="font-medium text-zinc-900 dark:text-zinc-100">{currentPage}</span> of{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{totalPages}</span>
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 whitespace-nowrap">Rows per page</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="h-8 appearance-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-3 pr-8 py-1 text-xs outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 rounded-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((page, i) => (
            <React.Fragment key={i}>
              {page === "..." ? (
                <span className="px-2 text-zinc-400"><MoreHorizontal className="h-4 w-4" /></span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg text-xs",
                    currentPage === page ? "shadow-lg shadow-primary/20" : "text-zinc-500"
                  )}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 rounded-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
