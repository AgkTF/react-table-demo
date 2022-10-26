import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { ColsGroupState } from '../../types';

type Props = {
  title: string;
  clickHandler?: any;
  currentColsState: ColsGroupState;
};

export function CollapsibleHeader({
  title,
  clickHandler,
  currentColsState,
}: Props) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2"
      onClick={clickHandler}
    >
      <div className="bg-white rounded-sm flex items-center justify-center">
        {currentColsState === 'visible' ? (
          <MinusIcon className="h-3 w-3 text-[#4f477e]" />
        ) : (
          <PlusIcon className="h-3 w-3 text-[#4f477e]" />
        )}
      </div>

      <span>{title}</span>
    </button>
  );
}
