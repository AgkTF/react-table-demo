import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { TableMW } from '../../../types';
import { ConfigObjBuilder } from '../../../utils';

export default function useSortingMiddleware<T>(): TableMW<T> {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (configObj?: ConfigObjBuilder<T>) => {
    return (
      configObj?.addSorting(sorting, setSorting) ||
      new ConfigObjBuilder<T>().addSorting(sorting, setSorting)
    );
  };
}
