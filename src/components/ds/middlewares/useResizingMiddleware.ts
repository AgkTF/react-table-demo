import { ColumnResizeMode } from '@tanstack/react-table';
import { ConfigObjBuilder } from '../../../utils';

type Props = {
  columnResizeMode: ColumnResizeMode;
};

export default function useResizingMiddleware<T>({ columnResizeMode }: Props) {
  return new ConfigObjBuilder<T>().addResizing(columnResizeMode).build();
}
