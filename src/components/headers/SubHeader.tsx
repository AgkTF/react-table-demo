import { Header } from '@tanstack/react-table';
import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/20/solid';
import { JustTextHeader } from './JustTextHeader';

type Props<T> = {
  header: Header<T, unknown>;
};

export function SubHeader<T>({ header }: Props<T>) {
  return (
    <>
      <div
        className={`flex items-center justify-center gap-1 ${
          header.column.getCanSort() ? 'cursor-pointer' : ''
        }`}
      >
        <JustTextHeader title={header.column.columnDef.header as string} />

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
