import { Table, HeaderGroup } from '@tanstack/react-table';

export function pinnedColsWidth<T>(headerGroup: HeaderGroup<T>) {
  return headerGroup.headers.map(header => header.getSize());
}

export function colsOffsets(colWidths: number[]) {
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
