import { Header, flexRender } from '@tanstack/react-table';
import { Tract } from '../../types';
import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/20/solid';

type Props = {
  header: Header<Tract, unknown>;
};

export function SubHeader({ header }: Props) {
  return (
    <>
      <div className="flex items-center justify-center gap-1">
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}

        {{
          asc: <ArrowLongUpIcon className="h-4 w-4 text-inherit shrink-0" />,
          desc: <ArrowLongDownIcon className="h-4 w-4 text-inherit shrink-0" />,
        }[header.column.getIsSorted() as string] ?? null}
      </div>

      {header.column.getCanResize() ? (
        <div
          className="absolute right-0 top-0 h-full w-1 bg-sky-500 cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100"
          onMouseDown={header.getResizeHandler()}
        ></div>
      ) : null}
    </>
  );
}
