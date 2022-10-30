import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { JustTextCell, SubHeader } from '../../components';
import { MIN_WIDTH } from '../../constants';
import { DSU } from '../../types';
import cn from 'classnames';
import { createDsus } from '../../utils/create-random-dsu';

const columnHelper = createColumnHelper<DSU>();
const data = createDsus(15);
const columns = [
  columnHelper.accessor('wellAPI', {
    header: 'well API',
  }),
  columnHelper.accessor('operatorShortName', {
    header: 'operator name',
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
];

export function UnverifiedTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      // header: ({ header }) => <SubHeader<DSU> header={header} />,
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
            className="bg-[#4a4a4a] text-white capitalize text-sm"
          >
            {headerGroup.headers.map(header => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
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
      <h3 className="font-semibold text-xl text-purple-800">Unverified DSUs</h3>

      <div className="w-full overflow-auto max-h-[1000px] relative">
        <table
          className="mt-5 w-full"
          // style={{ width: table.getCenterTotalSize() }}
        >
          {theadContent}
          {tbodyContent}
        </table>
      </div>
    </section>
  );
}
