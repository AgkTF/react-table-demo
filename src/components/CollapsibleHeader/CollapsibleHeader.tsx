import { MinusIcon } from '@heroicons/react/20/solid';
import { Tract } from '../../types';
import { Column } from '@tanstack/react-table';

type Props = {
  title: string;
  column: Column<Tract, unknown>;
  clickHandler?: any;
};

export function CollapsibleHeader({ title, clickHandler, column }: Props) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2"
      onClick={e => {
        console.log('toggling');

        clickHandler(e);
      }}
    >
      <div className="bg-white rounded-sm flex items-center justify-center">
        <MinusIcon className="h-4 w-4 text-[#4f477e]" />
      </div>

      {/* <input
        type="checkbox"
        checked={column.columns.find(c => c.id === 'range')?.getIsVisible()}
        onChange={column.columns
          .find(c => c.id === 'range')
          ?.getToggleVisibilityHandler()}
      /> */}
      <span>{title}</span>
    </button>
  );
}
