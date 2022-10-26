import { MinusIcon } from '@heroicons/react/20/solid';

type Props = {
  title: string;
  clickHandler?: any;
};

export function CollapsibleHeader({ title, clickHandler }: Props) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2"
      onClick={clickHandler}
    >
      <div className="bg-white rounded-sm flex items-center justify-center">
        <MinusIcon className="h-3 w-3 text-[#4f477e]" />
      </div>

      <span>{title}</span>
    </button>
  );
}
