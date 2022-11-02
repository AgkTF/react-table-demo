import { Table } from '@tanstack/react-table';
import { createContext, ReactNode, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  getFilteredRowModel,
  FilterFn,
} from '@tanstack/react-table';

type ProviderProps = { children: ReactNode };

export const TableContext = createContext(null);

// export function TableDataProvider<T>({ children }: ProviderProps) {
//   const [sorting, setSorting] = useState<SortingState>([]);

//   const table = useReactTable({
//     data: [],
//     columns: [],
//     state: {
//       sorting,
//     },
//     columnResizeMode: 'onChange',
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>
//   );
// }
