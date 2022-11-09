import {
  useReactTable,
  ColumnDef,
  TableOptions,
  getCoreRowModel,
} from '@tanstack/react-table';
import { MWReturn } from '../../../types';

type HookParams<T> = {
  data: T[];
  columns: ColumnDef<T, string>[];
  defaultColumn?: Partial<ColumnDef<T, unknown>> | undefined;
  middleware: MWReturn<T>[];
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
  middleware,
}: HookParams<T>) {
  const defaultConfigObj: Partial<TableOptions<T>> = {
    enableSorting: false,
    enableColumnResizing: false,
  };

  const mws = middleware.length
    ? middleware.reduce((prevResult, currFn) => {
        return currFn(prevResult);
      }, defaultConfigObj)
    : defaultConfigObj;

  const completeConfigObj: TableOptions<T> = {
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    ...mws,
  };
  console.log('mws', mws);

  const table = useReactTable({ ...completeConfigObj });
  return table;
}
