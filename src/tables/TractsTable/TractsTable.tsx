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
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { SelectedCell, Tract } from '../../types';
import { createTracts } from '../../utils';
import {
  EditableInputField,
  JustTextCell,
  CollapsibleHeader,
  TractStatusCell,
  SubHeader,
  JustTextHeader,
} from '../../components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { MIN_WIDTH } from '../../constants';

const columnHelper = createColumnHelper<Tract>();

const data = createTracts(5);

export function BasicTable() {
  const tableRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const columns = useMemo<ColumnDef<Tract>[]>(
    () => [
      columnHelper.group({
        id: 'tracts',
        header: () => <JustTextHeader title="tracts" />,
        enableResizing: false,
        columns: [
          columnHelper.accessor('tractNumber', {
            header: ({ header }) => <SubHeader header={header} title="#" />,
            cell: info => <JustTextCell info={info} />,
            size: 75,
          }),
          columnHelper.accessor('isActive', {
            header: ({ header }) => (
              <SubHeader header={header} title="status" />
            ),
            cell: info => <TractStatusCell info={info} />,
            size: 80,
            enableSorting: false,
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
        enableResizing: false,
        columns: [
          columnHelper.accessor('basinShortName', {
            header: 'Basin',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('stateShortName', {
            header: 'State',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('countyName', {
            header: 'County',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('township', {
            header: 'TWN',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('range', {
            header: 'Range',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('section', {
            header: 'Section',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('legal', {
            header: 'Legal',
            cell: info => <EditableInputField info={info} />,
            enableSorting: false,
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
        enableResizing: false,
        columns: [
          columnHelper.accessor('tractOwner', {
            header: 'Owner',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('ownershipStatus', {
            header: ({ column }) => {
              return <div className="truncate">Ownership Status</div>;
            },
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('interestType', {
            header: 'Interest Type',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('grossAcres', {
            header: 'Gross Acres',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('netAcres', {
            header: 'Net Acres',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('deliveredNRI', {
            header: 'Delivered NRI(%)',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('costPerAcre', {
            header: 'Cost/Acres ($)',
            cell: info => <JustTextCell info={info} />,
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
        enableResizing: false,
        columns: [
          columnHelper.accessor('instrumentType', {
            header: 'Instrument Type',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('assignorOrGrantor', {
            header: 'Assignor/Grantor',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('assigneeOrGrantee', {
            header: 'Assignee/Grantee',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('recordingNumber', {
            header: 'Recording Number',
            cell: info => <JustTextCell info={info} />,
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
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('lessee', {
            header: 'Lessee',
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('leaseRecordingNumber', {
            header: ({ header }) => (
              <SubHeader header={header} title="lease recording number" />
            ),
            cell: info => <JustTextCell info={info} />,
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
            cell: info => <JustTextCell info={info} />,
          }),
          columnHelper.accessor('leaseOptionTerm', {
            header: 'Option Term',
            cell: info => <JustTextCell info={info} />,
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
      sorting,
    },
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: MIN_WIDTH,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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

  const updateSelectedCells = (
    newCell: SelectedCell,
    mode: 'single' | 'multi'
  ) => {
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
  };

  const resetSelectedCells = useCallback(() => {
    setSelectedCells([]);
  }, []);

  useOnClickOutside(tableRef, resetSelectedCells);

  const theadContent = (
    <thead>
      {table.getHeaderGroups().map(headerGroup => {
        return (
          <tr
            key={headerGroup.id}
            className={` ${
              headerGroup.depth === 0
                ? 'bg-[#4f477e] text-white uppercase'
                : 'bg-[#b7b6c9] text-[#4f477e] capitalize'
            }`}
          >
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`relative py-1 border border-gray-200 group truncate ${
                  headerGroup.depth > 0 ? 'px-3' : 'px-2'
                } ${
                  header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                }`}
                onClick={header.column.getToggleSortingHandler()}
                style={{ minWidth: header.getSize(), maxWidth: MIN_WIDTH }}
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
          className={`cursor-pointer truncate ${
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
                className={`py-3 px-4 text-[14px] text-[#4a4a4a] ${
                  isCellSelected
                    ? 'border-2 border-sky-400'
                    : 'border border-gray-200'
                }`}
                onClick={() => {
                  updateSelectedCells(
                    {
                      cellData: cell.getValue(),
                      cellId: cell.id,
                    },
                    'single'
                  );
                }}
                style={{
                  maxWidth: MIN_WIDTH,
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

  // FIXME:
  // useEffect(() => {
  //   toggleColsVisibility('ownership');
  //   toggleColsVisibility('conveyance');
  // }, [toggleColsVisibility]);

  return (
    <section className="py-3 px-4">
      <h2 className="font-bold text-2xl text-purple-900">Tracts Table</h2>

      <div className="w-full overflow-auto max-h-[1000px]">
        <table
          className="mt-5"
          ref={tableRef}
          style={{ width: table.getCenterTotalSize() }}
        >
          {theadContent}
          {tbodyContent}
        </table>
      </div>

      <div className="mt-4 text-xs text-slate-800">
        <pre>{JSON.stringify(table.getState().columnSizing, null, 2)}</pre>
        <pre>{JSON.stringify(table.getState().sorting, null, 2)}</pre>
      </div>
    </section>
  );
}
