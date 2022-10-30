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
import {
  ColVisibilityState,
  OffsetValues,
  SelectedCell,
  Tract,
} from '../../types';
import { createTracts } from '../../utils';
import {
  EditableInputField,
  JustTextCell,
  CollapsibleHeader,
  TractStatusCell,
  SubHeader,
  JustTextHeader,
} from '../../components';
import { useOnClickOutside } from '../../hooks';
import { MIN_WIDTH } from '../../constants';
import cn from 'classnames';
import ActionsCell from '../../components/ActionsCell/ActionsCell';

const leftValues: OffsetValues = {
  mainHeadersOffsets: [0],
  subHeadersOffsets: [0, 75],
};

const columnHelper = createColumnHelper<Tract>();

const data = createTracts(5);

export function BasicTable() {
  const tableRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
            header: '#',
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 75,
            enableResizing: false,
          }),
          columnHelper.accessor('isActive', {
            header: 'status',
            cell: info => <TractStatusCell info={info} />,
            size: 80,
            enableSorting: false,
            enableResizing: false,
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
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('stateShortName', {
            header: 'State',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('countyName', {
            header: 'County',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('township', {
            header: 'TWN',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('range', {
            header: 'Range',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('section', {
            header: 'Section',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('legal', {
            header: 'Legal',
            cell: info => <EditableInputField info={info} />,
            enableSorting: false,
            size: 130,
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
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 140,
          }),
          columnHelper.accessor('ownershipStatus', {
            header: 'Ownership Status',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('interestType', {
            header: 'Interest Type',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('grossAcres', {
            header: 'Gross Acres',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('netAcres', {
            header: 'Net Acres',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('deliveredNRI', {
            header: 'Delivered NRI(%)',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('costPerAcre', {
            header: 'Cost/Acres ($)',
            cell: info => <JustTextCell<Tract> info={info} />,
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
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('assignorOrGrantor', {
            header: 'Assignor/Grantor',
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 200,
          }),
          columnHelper.accessor('assigneeOrGrantee', {
            header: 'Assignee/Grantee',
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 140,
          }),
          columnHelper.accessor('recordingNumber', {
            header: 'Recording Number',
            cell: info => <JustTextCell<Tract> info={info} />,
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
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 120,
          }),
          columnHelper.accessor('lessee', {
            header: 'Lessee',
            cell: info => <JustTextCell<Tract> info={info} />,
            size: 120,
          }),
          columnHelper.accessor('leaseRecordingNumber', {
            header: 'lease recording number',
            cell: info => <JustTextCell<Tract> info={info} />,
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
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
          columnHelper.accessor('leaseOptionTerm', {
            header: 'Option Term',
            cell: info => <JustTextCell<Tract> info={info} />,
          }),
        ],
      }),
      columnHelper.group({
        id: 'actions',
        header: () => <JustTextHeader title="actions" />,
        enableSorting: false,
        enableResizing: false,
        columns: [
          columnHelper.display({
            header: 'actions',
            cell: () => <ActionsCell />,
            enableSorting: false,
            enableResizing: false,
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
      columnPinning: {
        left: ['tractNumber', 'isActive'],
        right: ['actions'],
      },
    },
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: MIN_WIDTH,
      size: 90,
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
      const currentColsState: ColVisibilityState = table
        .getColumn(groupColIds[1])
        .getIsVisible()
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

  const setColumnVisibilityState = useCallback(
    (groupId: string, newState: ColVisibilityState) => {
      const groupColIds = table
        .getAllLeafColumns()
        .filter(col => col.parent?.id === groupId)
        .map(col => col.id);

      const updatedLocationColsState: VisibilityState = {};
      if (newState === 'visible') {
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
        return headerGroup.depth === 0 ? (
          <tr
            key={headerGroup.id}
            className="bg-[#4f477e] text-white uppercase text-sm"
          >
            {headerGroup.headers.map(header => {
              const headerClasses = cn(
                'py-1 px-3 relative border border-gray-200 group truncate',
                {
                  'sticky bg-[#2f256a] z-10': ['left', 'right'].includes(
                    header.column.getIsPinned() as string
                  ),
                }
              );
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={headerClasses}
                  style={{
                    minWidth: header.getSize(),
                    maxWidth: MIN_WIDTH,
                    left:
                      header.column.getIsPinned() === 'left'
                        ? leftValues.mainHeadersOffsets[header.index]
                        : undefined,
                    right:
                      header.column.getIsPinned() === 'right' ? 0 : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ) : (
          // ! sub-headers
          <tr
            key={headerGroup.id}
            className="bg-[#b7b6c9] text-[#4f477e] capitalize text-sm"
          >
            {headerGroup.headers.map(header => {
              const subHeaderClasses = cn(
                'py-2 px-3 relative border border-gray-200 group truncate',
                {
                  'sticky bg-[#b7b6c9] text-[#4f477e] z-10': [
                    'left',
                    'right',
                  ].includes(header.column.getIsPinned() as string),
                }
              );

              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={subHeaderClasses}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    minWidth: header.getSize(),
                    maxWidth: MIN_WIDTH,
                    left:
                      header.column.getIsPinned() === 'left'
                        ? leftValues.subHeadersOffsets[header.index]
                        : undefined,
                    right:
                      header.column.getIsPinned() === 'right' ? 0 : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <SubHeader<Tract> header={header} />
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
              const isCellSelected = selectedCells.find(
                c => c.cellId === cell.id
              );

              const cellClasses = cn('p-3 text-[13px] text-[#4a4a4a]', {
                'border-2 border-sky-400': isCellSelected,
                'border border-gray-200': !isCellSelected,
                'z-10 sticky': ['left', 'right'].includes(
                  cell.column.getIsPinned() as string
                ),
                'bg-[#f5f6f7]': i % 2 === 0,
                'bg-white': i % 2 !== 0,
              });
              return (
                <td
                  key={cell.id}
                  className={cellClasses}
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
                    left:
                      cell.column.getIsPinned() === 'left'
                        ? leftValues.subHeadersOffsets[
                            cell.column.getPinnedIndex()
                          ]
                        : undefined,
                    right:
                      cell.column.getIsPinned() === 'right' ? 0 : undefined,
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

  useEffect(() => {
    setColumnVisibilityState('ownership', 'hidden');
    setColumnVisibilityState('location', 'hidden');
  }, [setColumnVisibilityState]);

  return (
    <>
      <h2 className="font-bold text-2xl text-purple-900">Tracts Table</h2>

      <div className="w-full overflow-auto max-h-[1000px] relative">
        <table
          className="mt-5"
          ref={tableRef}
          style={{ width: table.getCenterTotalSize() }}
        >
          {theadContent}
          {tbodyContent}
        </table>
      </div>

      <div className="mt-5 text-xs text-slate-800 flex items-start gap-20">
        <div className="space-y-2">
          <h4 className="font-bold text-sm">columnSizing</h4>
          <pre>{JSON.stringify(table.getState().columnSizing, null, 2)}</pre>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-sm">columnSizingInfo</h4>
          <pre>
            {JSON.stringify(table.getState().columnSizingInfo, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-sm">sorting</h4>
          <pre>{JSON.stringify(table.getState().sorting, null, 2)}</pre>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-sm">columnPinning</h4>
          <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
