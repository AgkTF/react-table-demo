import {
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import { MIN_WIDTH } from '../../constants';
import { JustTextCell, SubHeader } from '../../components';
import { DSU } from '../../types';
import { createDsus } from '../../utils/create-random-dsu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../../components/ds';
import cn from 'classnames';
import { useTableConfig } from '../../components/ds/hooks/useTableConfig';
// import useSortingMiddleware from '../../components/ds/middleware/useSortingMiddleware';
import useResizingMiddlewareV2 from '../../components/ds/middleware/useResizingMiddleware';

const data = createDsus(5);
const columnHelper = createColumnHelper<DSU>();
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
] as ColumnDef<DSU, string>[];

export function DsTable() {
  // const sortingMiddleware = useSortingMiddleware<DSU>();
  const resizingMiddleware = useResizingMiddlewareV2<DSU>({
    columnResizeMode: 'onChange',
  });

  const table = useTableConfig<DSU>({
    data,
    columns,
    defaultColumn: {
      minSize: MIN_WIDTH,
      cell: info => <JustTextCell<DSU> info={info} />,
    },
    middleware: [resizingMiddleware],
    // middleware: [sortingMiddleware, resizingMiddleware],
  });

  return (
    <>
      <h2 className="font-bold text-2xl text-purple-900">Using DS Table</h2>

      <section className="mt-6 text-[#2d5f65]">
        <h3 className={`font-semibold text-xl`}>Verified DSUs</h3>

        <div className="mt-4 pb-2 w-full overflow-auto max-h-[440px] relative">
          <Table tableClasses="w-full">
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow
                  key={headerGroup.id}
                  rowClasses="text-white capitalize text-sm bg-[#2d5f65]"
                >
                  {headerGroup.headers.map(header => (
                    <TableHeaderCell
                      key={header.id}
                      cellClasses="py-2 px-3 relative border border-gray-200 group truncate"
                      {...{
                        colSpan: header.colSpan,
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          minWidth: header.getSize(),
                          maxWidth: MIN_WIDTH,
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <SubHeader<DSU> header={header} />
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.map((row, i) => {
                const rowClasses = cn(
                  'cursor-pointer truncate hover:bg-[#dddfe2]',
                  {
                    'bg-[#f5f6f7]': i % 2 === 0,
                    'bg-white': i % 2 !== 0,
                  }
                );

                return (
                  <TableRow key={row.id} rowClasses={rowClasses}>
                    {row.getVisibleCells().map(cell => {
                      const cellClasses = cn(
                        'p-3 text-[13px] text-[#4a4a4a] border border-[#9b9b9b80]'
                      );

                      return (
                        <TableCell
                          key={cell.id}
                          cellClasses={cellClasses}
                          {...{
                            style: {
                              maxWidth: MIN_WIDTH,
                            },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-5 space-y-3">
        <h2 className="font-bold text-2xl text-purple-900">Table State</h2>
        <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
      </section>
    </>
  );
}
