import {
  getSortedRowModel,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';
import { useState } from 'react';
import { MWReturn } from '../../../types';

export function useSortingMiddleware<T>(): MWReturn<T> {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (configObj?: Partial<TableOptions<T>>) => {
    const objToReturn: Partial<TableOptions<T>> = {
      state: {
        sorting,
      },
      enableSorting: true,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
    };

    if (configObj) {
      return {
        ...configObj,
        ...objToReturn,
        state: {
          ...configObj.state,
          ...objToReturn.state,
        },
      };
    }

    return objToReturn;
  };
}
