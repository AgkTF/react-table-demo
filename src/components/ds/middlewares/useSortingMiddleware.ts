import {
  getSortedRowModel,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';
import { useState } from 'react';

export default function useSortingMiddleware<T>() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const configObj: Partial<TableOptions<T>> = {
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  };

  return configObj;
}
