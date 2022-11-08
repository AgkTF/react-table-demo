import {
  useReactTable,
  ColumnDef,
  TableOptions,
  getCoreRowModel,
} from '@tanstack/react-table';

type HookParams<T> = {
  data: T[];
  columns: ColumnDef<T, string>[];
  defaultColumn?: Partial<ColumnDef<T, unknown>> | undefined;
  middleware?: any[];
  // middleware: TableMW<T>[];
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
  const mws = middleware?.reduce((prevResult, currFn, i) => {
    if (i !== middleware.length - 1) {
      return currFn(prevResult);
    }
    return currFn(prevResult).build();
  }, undefined);

  const completeConfigObj: TableOptions<T> = {
    data,
    columns,
    defaultColumn,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    ...mws,
  };

  const table = useReactTable({ ...completeConfigObj });

  return table;
}
