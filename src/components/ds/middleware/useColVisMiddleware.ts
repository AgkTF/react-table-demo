import { TableOptions, VisibilityState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState } from 'react';
import { MWReturn } from '../../../types';

export function useColVisMiddleware<T>(): {
  colVisMW: MWReturn<T>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
} {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return {
    setColumnVisibility,
    colVisMW: (configObj?: Partial<TableOptions<T>>) => {
      const objToReturn: Partial<TableOptions<T>> = {
        state: {
          columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
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
    },
  };
}
