"use no memo";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { categoryColumns, type Category } from "../components/columns";

export function useCategoryTableData(data: Category[]) {
  const columns = React.useMemo(() => categoryColumns, []);

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
