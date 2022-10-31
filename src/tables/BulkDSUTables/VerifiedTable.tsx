import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { JustTextCell, SubHeader } from '../../components';
import { MIN_WIDTH } from '../../constants';
import { DSU } from '../../types';
import cn from 'classnames';
import { createDsus } from '../../utils/create-random-dsu';

const columnHelper = createColumnHelper<DSU>();
const data = createDsus(5);

const columns = [
  columnHelper.accessor('wellAPI', {
    header: 'well API',
  }),
  columnHelper.accessor('operatorShortName', {
    header: 'operator name',
  }),
  columnHelper.accessor('acres', {
    header: 'acres QQ',
  }),
  columnHelper.accessor('county', {
    header: 'county',
  }),
  columnHelper.accessor('state', {
    header: 'state',
  }),
  columnHelper.accessor('basin', {
    header: 'basin',
  }),
  columnHelper.accessor('location', {
    header: 'location',
  }),
  columnHelper.accessor('lateralLength', {
    header: 'lateral Length',
  }),
  columnHelper.accessor('formations', {
    header: 'formations',
  }),
  columnHelper.accessor('lastModifiedDate', {
    header: 'last Modified Date',
  }),
];

export function VerifiedTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: MIN_WIDTH,
      cell: info => <JustTextCell<DSU> info={info} />,
    },
    state: {
      sorting,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const theadContent = (
    <thead>
      {table.getHeaderGroups().map(headerGroup => {
        return (
          <tr
            key={headerGroup.id}
            className="bg-[#2d5f65] text-white capitalize text-sm"
          >
            {headerGroup.headers.map(header => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className="py-2 px-3 relative border border-gray-200 group truncate"
                  style={{
                    minWidth: header.getSize(),
                    maxWidth: MIN_WIDTH,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <SubHeader<DSU> header={header} />
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );

  const tbodyContent = (
    <tbody>
      {table.getRowModel().rows.map((row, i) => {
        const rowClasses = cn('cursor-pointer truncate hover:bg-[#dddfe2]', {
          'bg-[#f5f6f7]': i % 2 === 0,
          'bg-white': i % 2 !== 0,
        });
        return (
          <tr key={row.id} className={rowClasses}>
            {row.getVisibleCells().map(cell => {
              const cellClasses = cn(
                'p-3 text-[13px] text-[#4a4a4a] border border-[#9b9b9b80]',
                {
                  'bg-[#f5f6f7]': i % 2 === 0,
                  'bg-white': i % 2 !== 0,
                }
              );

              return (
                <td
                  key={cell.id}
                  className={cellClasses}
                  style={{
                    maxWidth: MIN_WIDTH,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
  return (
    <section>
      <h3 className="font-semibold text-xl text-[#2d5f65]">Verified DSUs</h3>

      <div className="w-full overflow-auto max-h-[440px] relative">
        <table className="mt-3 w-full">
          {theadContent}
          {tbodyContent}
        </table>
      </div>
    </section>
  );
}
