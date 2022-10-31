import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DebouncedInput, JustTextCell, SubHeader } from '../../components';
import { MIN_WIDTH } from '../../constants';
import { DSU } from '../../types';
import cn from 'classnames';

type Props = {
  columns: ColumnDef<DSU, string>[];
  data: DSU[];
  tableTitle: string;
  tableId: 'verified' | 'unverified' | 'forReview';
};

export function DSUTableTemplate({
  tableTitle,
  columns,
  data,
  tableId,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: MIN_WIDTH,
      cell: info => <JustTextCell<DSU> info={info} />,
    },
    state: {
      sorting,
      globalFilter,
    },
    columnResizeMode: 'onChange',
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const trClasses = cn('text-white capitalize text-sm', {
    'bg-[#2d5f65]': tableId === 'verified',
    'bg-[#4a4a4a]': tableId === 'unverified',
    'bg-[#940605]': tableId === 'forReview',
  });

  const theadContent = (
    <thead>
      {table.getHeaderGroups().map(headerGroup => {
        return (
          <tr key={headerGroup.id} className={trClasses}>
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

  const textColor = cn({
    'text-[#2d5f65]': tableId === 'verified',
    'text-[#4a4a4a]': tableId === 'unverified',
    'text-[#940605]': tableId === 'forReview',
  });

  return (
    <section className={textColor}>
      <h3 className={`font-semibold text-xl`}>{tableTitle}</h3>

      <div className="mt-3">
        <DebouncedInput
          value={globalFilter ?? ''}
          type="text"
          onChange={value => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
          className={`w-1/4 text-sm rounded-md focus:outline-none focus:border-none`}
        />
      </div>

      <div className="mt-4 w-full overflow-auto max-h-[440px] relative">
        <table className="w-full">
          {theadContent}
          {tbodyContent}
        </table>
      </div>
    </section>
  );
}
