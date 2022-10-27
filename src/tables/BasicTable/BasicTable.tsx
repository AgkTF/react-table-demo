import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnDef,
} from '@tanstack/react-table';
import {
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SelectedCell, Tract } from '../../types';
import { createTracts } from '../../utils';
import { CollapsibleHeader } from '../../components/CollapsibleHeader/CollapsibleHeader';

const columnHelper = createColumnHelper<Tract>();

const data = createTracts(10);

export function BasicTable() {
  const legalInputRef = useRef<any>(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const columns = useMemo<ColumnDef<Tract>[]>(
    () => [
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
        header: () => (
          <CollapsibleHeader
            title="Location"
            clickHandler={() => toggleColsVisibility('location')}
            currentColsState={currentColsState('location')}
          />
        ),
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
            cell: info => (
              <input
                type="text"
                spellCheck="false"
                value={info.getValue()}
                className="p-0 bg-inherit text-inherit text-[14px] border border-x-0 border-t-0 border-dashed border-b-[#9b9b9b] truncate"
                onChange={() => {}}
              />
            ),
          }),
        ],
      }),
      columnHelper.group({
        id: 'ownership',
        header: () => (
          <CollapsibleHeader
            title="Ownership"
            clickHandler={() => toggleColsVisibility('ownership')}
            currentColsState={currentColsState('ownership')}
          />
        ),
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
        header: () => (
          <CollapsibleHeader
            title="Conveyance Details"
            clickHandler={() => toggleColsVisibility('conveyance')}
            currentColsState={currentColsState('conveyance')}
          />
        ),
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const currentColsState = useCallback(
    (groupId: string) => {
      const groupColIds = table
        .getAllLeafColumns()
        .filter(col => col.parent?.id === groupId)
        .map(col => col.id);

      return table.getColumn(groupColIds[1]).getIsVisible()
        ? 'visible'
        : 'hidden';
    },
    [table]
  );

  const toggleColsVisibility = useCallback(
    (groupId: string) => {
      const groupColIds = table
        .getAllLeafColumns()
        .filter(col => col.parent?.id === groupId)
        .map(col => col.id);

      const updatedLocationColsState: VisibilityState = {};
      const currentColsState = table.getColumn(groupColIds[1]).getIsVisible()
        ? 'visible'
        : 'hidden';

      if (currentColsState === 'hidden') {
        groupColIds.forEach(id => (updatedLocationColsState[id] = true));
      } else {
        groupColIds
          .slice(1)
          .forEach(id => (updatedLocationColsState[id] = false));
      }

      setColumnVisibility(prev => ({ ...prev, ...updatedLocationColsState }));
    },
    [table]
  );

  const updateSelectedCells = useCallback(
    (newCell: SelectedCell, mode: 'single' | 'multi') => {
      if (mode === 'single') {
        setSelectedCells([newCell]);
      } else {
        setSelectedCells(prev => {
          const isSelected = prev.find(c => c.cellId === newCell.cellId);
          if (!isSelected) {
            return [...prev, newCell];
          }
          return prev;
        });
      }
    },
    []
  );

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
          className={`cursor-pointer ${
            i % 2 === 0 ? 'bg-[#f5f6f7]' : 'bg-white'
          } hover:bg-[#dddfe2]`}
        >
          {row.getVisibleCells().map(cell => {
            const isCellSelected = selectedCells.find(
              c => c.cellId === cell.id
            );
            return (
              <td
                key={cell.id}
                className={`py-3 px-4 text-[14px] text-[#4a4a4a] whitespace-nowrap ${
                  isCellSelected
                    ? 'border-2 border-sky-400'
                    : 'border border-gray-200'
                } `}
                onClick={() => {
                  updateSelectedCells(
                    {
                      cellData: cell.getValue(),
                      cellId: cell.id,
                    },
                    'single'
                  );
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );

  useEffect(() => {
    toggleColsVisibility('ownership');
    toggleColsVisibility('conveyance');
  }, [toggleColsVisibility]);

  return (
    <section className="py-3 px-4">
      <h2 className="font-bold text-2xl text-purple-900">Basic Table</h2>

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
