import { CellContext } from '@tanstack/react-table';
import { Tract } from '../../types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  info: CellContext<Tract, any>;
};
export function TractStatusCell({ info }: Props) {
  return info.getValue() ? (
    <CheckIcon className="p-px rounded-full text-white bg-green-700 h-5 w-5 mx-auto" />
  ) : (
    <XMarkIcon className="p-px rounded-full text-white bg-red-700 h-5 w-5 mx-auto" />
  );
}
