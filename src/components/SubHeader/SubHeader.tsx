import { Header, HeaderGroup, flexRender } from '@tanstack/react-table';
import { MIN_WIDTH } from '../../constants';
import { Tract } from '../../types';
import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/20/solid';

type Props = {
  headerGroup: HeaderGroup<Tract>;
  header: Header<Tract, unknown>;
};

export function SubHeader({ headerGroup, header }: Props) {
  return (
    <th
      colSpan={header.colSpan}
      className={`relative py-1 border border-gray-200 group truncate ${
        headerGroup.depth > 0 ? 'px-3 capitalize' : 'px-2'
      } ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
      onClick={header.column.getToggleSortingHandler()}
      style={{ minWidth: header.getSize(), maxWidth: MIN_WIDTH }}
    >
      <>
        <div className="flex items-center justify-center gap-1">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}

          {{
            asc: <ArrowLongUpIcon className="h-4 w-4 text-inherit" />,
            desc: <ArrowLongDownIcon className="h-4 w-4 text-inherit" />,
          }[header.column.getIsSorted() as string] ?? null}
        </div>

        <div
          className="absolute right-0 top-0 h-full w-1 bg-sky-500 cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100"
          onMouseDown={header.getResizeHandler()}
        ></div>
      </>
    </th>
  );
}
