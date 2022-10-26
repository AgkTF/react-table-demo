import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Tract } from '../../types';
import { createTracts } from '../../utils';

const columnHelper = createColumnHelper<Tract>();
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
    header: () => <span>Location</span>,
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
const data = createTracts(10);

export default function BasicTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                className={`py-1 whitespace-nowrap border border-gray-200 capitalize ${
                  headerGroup.depth > 0 ? 'px-3' : 'px-2'
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
      <h2 className="font-bold text-2xl text-gray-800">Basic Table</h2>

      <div className="w-full overflow-auto max-h-[1000px]">
        <table className="mt-5 table-fixed">
          {theadContent}
          {tbodyContent}
        </table>
      </div>
    </section>
  );
}
