import { CellContext } from '@tanstack/react-table';

type Props<T> = {
  info: CellContext<T, any>;
};

export function JustTextCell<T>({ info }: Props<T>) {
  return <div className="text-center truncate">{info.getValue()}</div>;
}
