import { ColumnResizeMode, TableOptions } from '@tanstack/react-table';
import { MWReturn } from '../../../types';

type Props = {
  columnResizeMode: ColumnResizeMode;
};

export function useResizingMiddleware<T>({
  columnResizeMode,
}: Props): MWReturn<T> {
  return (configObj?: Partial<TableOptions<T>>) => {
    const objToReturn = {
      columnResizeMode,
      enableColumnResizing: true,
    };

    if (configObj) {
      return {
        ...configObj,
        ...objToReturn,
      };
    }

    return objToReturn;
  };
}
