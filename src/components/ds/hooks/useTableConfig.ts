import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

type HookParams<T> = {
  data: T[];
  columns: ColumnDef<T, string>[];
  defaultColumn?: Partial<ColumnDef<T, unknown>> | undefined;
};

/**
 * The purpose of this hook is
 * making adding new features/using existing ones
 * easier for us -the developers-.
 */
export function useTableConfig<T>({
  data,
  columns,
  defaultColumn,
}: HookParams<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    defaultColumn,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return table;
}
