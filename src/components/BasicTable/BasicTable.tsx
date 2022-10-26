import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { Tract } from '../../types';
import { createTracts } from '../../utils';
import { CollapsibleHeader } from '../CollapsibleHeader/CollapsibleHeader';

const columnHelper = createColumnHelper<Tract>();

const data = createTracts(10);

export default function BasicTable() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const columns = [
    columnHelper.group({
      id: 'tracts',
      header: () => <span>Tracts</span>,
      columns: [
        columnHelper.accessor('tractNumber', {
          header: '#',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('isActive', {
          header: 'Status',
          cell: info => (info.getValue() ? 'Active' : 'Inactive'),
        }),
      ],
    }),
    columnHelper.group({
      id: 'location',
      header: props => {
        console.log(props);
        return (
          <CollapsibleHeader
            title="Location"
            clickHandler={toggleLocationColumns}
          />
        );
      },
      columns: [
        columnHelper.accessor('basinShortName', {
          header: 'Basin',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('stateShortName', {
          header: 'State',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('countyName', {
          header: 'County',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('township', {
          header: 'TWN',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('range', {
          header: 'Range',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('section', {
          header: 'Section',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('legal', {
          header: 'Legal',
          cell: info => info.getValue(),
        }),
      ],
    }),
    columnHelper.group({
      id: 'ownership',
      header: () => <span>Ownership</span>,
      columns: [
        columnHelper.accessor('tractOwner', {
          header: 'Owner',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('ownershipStatus', {
          header: 'Ownership Status',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('interestType', {
          header: 'Interest Type',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('grossAcres', {
          header: 'Gross Acres',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('netAcres', {
          header: 'Net Acres',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('deliveredNRI', {
          header: 'Delivered NRI(%)',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('costPerAcre', {
          header: 'Cost/Acres ($)',
          cell: info => info.getValue(),
        }),
      ],
    }),
    columnHelper.group({
      id: 'conveyance',
      header: () => <span>Conveyance Details</span>,
      columns: [
        columnHelper.accessor('instrumentType', {
          header: 'Instrument Type',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('assignorOrGrantor', {
          header: 'Assignor/Grantor',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('assigneeOrGrantee', {
          header: 'Assignee/Grantee',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('recordingNumber', {
          header: 'Recording Number',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('recordingDate', {
          header: 'Recording Date',
          cell: info => {
            const d = info.getValue();
            return new Intl.DateTimeFormat('en-US').format(d);
          },
        }),
        columnHelper.accessor('effectiveDate', {
          header: 'Effective Date',
          cell: info => {
            const d = info.getValue();
            return new Intl.DateTimeFormat('en-US').format(d);
          },
        }),
        columnHelper.accessor('lessor', {
          header: 'Lessor',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('lessee', {
          header: 'Lessee',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('leaseRecordingNumber', {
          header: 'Lease Recording Number',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('leaseRecordingDate', {
          header: 'Lease Recording Date',
          cell: info => {
            const d = info.getValue();
            return new Intl.DateTimeFormat('en-US').format(d);
          },
        }),
        columnHelper.accessor('leaseEffectiveDate', {
          header: 'Lease Effective Date',
          cell: info => {
            const d = info.getValue();
            return new Intl.DateTimeFormat('en-US').format(d);
          },
        }),
        columnHelper.accessor('leasePrimaryTerm', {
          header: 'Primary Term',
          cell: info => info.getValue(),
        }),
        columnHelper.accessor('leaseOptionTerm', {
          header: 'Option Term',
          cell: info => info.getValue(),
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const locationColumns = useMemo(
    () =>
      table
        .getAllLeafColumns()
        .filter(col => col.parent?.id === 'location')
        .map(col => col.id),
    [table]
  );

  const toggleLocationColumns = useCallback(() => {
    const updatedLocationColsState: any = {};
    const locationsColsState = table
      .getColumn(locationColumns[1])
      .getIsVisible()
      ? 'visible'
      : 'hidden';

    if (locationsColsState === 'hidden') {
      locationColumns.forEach(id => (updatedLocationColsState[id] = true));
    } else {
      locationColumns
        .slice(1)
        .forEach(id => (updatedLocationColsState[id] = false));
    }

    setColumnVisibility(prev => ({ ...prev, ...updatedLocationColsState }));
  }, [locationColumns, table]);

  const theadContent = (
    <thead>
      {table.getHeaderGroups().map(headerGroup => {
        return (
          <tr
            key={headerGroup.id}
            className={`${
              headerGroup.depth === 0
                ? 'bg-[#4f477e] text-white uppercase'
                : 'bg-[#b7b6c9] text-[#4f477e]'
            }`}
          >
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`py-1 whitespace-nowrap border border-gray-200 ${
                  headerGroup.depth > 0 ? 'px-3 capitalize' : 'px-2'
                }`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );

  const tbodyContent = (
    <tbody>
      {table.getRowModel().rows.map((row, i) => (
        <tr
          key={row.id}
          className={`${
            i % 2 === 0 ? 'bg-[#f5f6f7]' : 'bg-white'
          } hover:bg-[#dddfe2]`}
        >
          {row.getVisibleCells().map(cell => (
            <td
              key={cell.id}
              className="py-3 px-4 border border-gray-200 text-[14px] text-[#4a4a4a] whitespace-nowrap"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <section className="py-3 px-4">
      <h2 className="font-bold text-2xl text-purple-900">Basic Table</h2>

      <div className="mt-5">
        <h3 className="font-semibold text-lg text-purple-900">
          Column Visibility Controls
        </h3>

        <label>
          <input
            type="checkbox"
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </label>
      </div>

      <div className="w-full overflow-auto max-h-[1000px]">
        <table className="mt-5 table-fixed">
          {theadContent}
          {tbodyContent}
        </table>
      </div>

      <div className="mt-4 text-xs text-slate-800">
        <pre>{JSON.stringify(table.getState().columnVisibility, null, 2)}</pre>
      </div>
    </section>
  );
}
