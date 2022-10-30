import { Table, HeaderGroup } from '@tanstack/react-table';
import { useEffect } from 'react';
import { OffsetValues } from '../types';

type Params<T> = {
  table: Table<T>;
};

function pinnedColsWidth<T>(headerGroup: HeaderGroup<T>) {
  return headerGroup.headers.map(header => header.getSize());
}

function colsOffsets(colWidths: number[]) {
  const offsets: number[] = [0, colWidths[0]];
  colWidths.forEach((col, i) => {
    if (i > 1) {
      const sliced = colWidths.slice(0, i);
      const offset = sliced.reduce((prev, curr) => prev + curr);
      offsets.push(offset);
    }
  });

  return offsets;
}

const leftOffsetValues: OffsetValues = {
  mainHeadersOffsets: [],
  subHeadersOffsets: [],
};

export function usePinnedCols<T>({ table }: Params<T>): OffsetValues {
  const isSomeColsPinnedOnLeft = table.getIsSomeColumnsPinned('left');
  if (!isSomeColsPinnedOnLeft) {
    console.log('🌭');
    return {
      mainHeadersOffsets: [],
      subHeadersOffsets: [],
    };
  }

  const leftPinnedHeaderGroups = table.getLeftHeaderGroups();
  const sizingInfo = table.getState().columnSizingInfo;
  const leftPinnedSubHeaderGroupsIds = leftPinnedHeaderGroups[1].headers.map(
    h => h.id
  );

  if (
    !leftPinnedSubHeaderGroupsIds.includes(
      sizingInfo.isResizingColumn as string
    )
  ) {
    return leftOffsetValues;
  }

  console.log('🧮');
  const mainHeadersWidth = pinnedColsWidth<T>(leftPinnedHeaderGroups[0]);
  const subHeadersWidth = pinnedColsWidth(leftPinnedHeaderGroups[1]);

  const mainHeadersOffsets = colsOffsets(mainHeadersWidth);
  const subHeadersOffsets = colsOffsets(subHeadersWidth);

  leftOffsetValues.mainHeadersOffsets = mainHeadersOffsets;
  leftOffsetValues.subHeadersOffsets = subHeadersOffsets;

  return leftOffsetValues;
}
