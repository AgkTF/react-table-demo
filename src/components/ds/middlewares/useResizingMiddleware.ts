import { ColumnResizeMode, TableOptions } from '@tanstack/react-table';

type Props = {
  columnResizeMode: ColumnResizeMode;
};

export default function useResizingMiddleware<T>({ columnResizeMode }: Props) {
  const configObj: Partial<TableOptions<T>> = {
    columnResizeMode,
  };

  return configObj;
}
