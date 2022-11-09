import { ColumnPinningState, TableOptions } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MWReturn } from '../../../types';

export function useColPinningMW<T>(initialState?: ColumnPinningState): {
  colPinningMW: MWReturn<T>;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
} {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});

  useEffect(() => {
    if (initialState) {
      setColumnPinning(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setColumnPinning,
    colPinningMW: (configObj?: Partial<TableOptions<T>>) => {
      const objToReturn: Partial<TableOptions<T>> = {
        state: {
          columnPinning,
        },
        onColumnPinningChange: setColumnPinning,
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
