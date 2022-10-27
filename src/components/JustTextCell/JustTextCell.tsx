import { CellContext } from '@tanstack/react-table';
import { Tract } from '../../types';

type Props = {
  info: CellContext<Tract, any>;
};

export function JustTextCell({ info }: Props) {
  return <div className="text-center truncate">{info.getValue()}</div>;
}
