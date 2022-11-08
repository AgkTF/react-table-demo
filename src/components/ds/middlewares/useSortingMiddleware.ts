import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { ConfigObjBuilder } from '../../../utils';

export default function useSortingMiddleware<T>() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const configObj = new ConfigObjBuilder<T>()
    .addSorting(sorting, setSorting)
    .build();

  return configObj;
}
