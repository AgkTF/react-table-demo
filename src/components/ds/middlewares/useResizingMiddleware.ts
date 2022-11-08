import { ColumnResizeMode } from '@tanstack/react-table';
import { TableMW } from '../../../types';
import { ConfigObjBuilder } from '../../../utils';

type Props = {
  columnResizeMode: ColumnResizeMode;
};

export default function useResizingMiddleware<T>({
  columnResizeMode,
}: Props): TableMW<T> {
  return (configObj?: ConfigObjBuilder<T>) =>
    configObj?.addResizing(columnResizeMode) ||
    new ConfigObjBuilder<T>().addResizing(columnResizeMode);
}
