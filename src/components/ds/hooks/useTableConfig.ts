import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  TableOptions,
} from '@tanstack/react-table';

type HookParams<T> = {
  data: T[];
  columns: ColumnDef<T, string>[];
  defaultColumn?: Partial<ColumnDef<T, unknown>> | undefined;
  middleware: any;
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
  const mws = middleware.reduce((prev: any, curr: any) => {
    return { ...prev, ...curr };
  }, {});

  const completeConfigObj: TableOptions<T> = {
    data,
    columns,
    defaultColumn,
    ...mws,
  };

  const table = useReactTable({ ...completeConfigObj });

  return table;
}
