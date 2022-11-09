import { VisibilityState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState } from 'react';
import { TableMW } from '../../../types';
import { ConfigObjBuilder } from '../../../utils';

export function useColVisMiddleware<T>(): {
  colVisMW: TableMW<T>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
} {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return {
    setColumnVisibility,
    colVisMW: (configObj?: ConfigObjBuilder<T>) => {
      return (
        configObj?.addColVis(columnVisibility, setColumnVisibility) ||
        new ConfigObjBuilder<T>().addColVis(
          columnVisibility,
          setColumnVisibility
        )
      );
    },
  };
}
