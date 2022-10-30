import { Table, HeaderGroup } from '@tanstack/react-table';

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

/**
 * ? What to do next?
 */

export function usePinnedCols<T>({ table }: Params<T>) {
  const leftPinnedHeaderGroups = table.getLeftHeaderGroups();

  const mainHeadersWidth = pinnedColsWidth<T>(leftPinnedHeaderGroups[0]);
  const subHeadersWidth = pinnedColsWidth(leftPinnedHeaderGroups[1]);

  const mainHeadersOffsets = colsOffsets(mainHeadersWidth);
  const subHeadersOffsets = colsOffsets(subHeadersWidth);

  return {
    mainHeadersOffsets,
    subHeadersOffsets,
  };
}
