import {
  ColumnResizeMode,
  getSortedRowModel,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface Builder {
  addSorting(
    sorting: SortingState,
    setSorting: Dispatch<SetStateAction<SortingState>>
  ): this;
  addResizing(columnResizeMode: ColumnResizeMode): this;
}

export class ConfigObjBuilder<T> implements Builder {
  private _product: Partial<TableOptions<T>>;

  constructor() {
    this._product = {
      enableSorting: false,
      enableColumnResizing: false,
    };
  }

  addSorting(
    sorting: SortingState,
    setSorting: Dispatch<SetStateAction<SortingState>>
  ): this {
    if (this._product.state) {
      this._product.state.sorting = sorting;
    } else {
      this._product.state = {};
      this._product.state.sorting = sorting;
    }
    this._product.enableSorting = true;
    this._product.onSortingChange = setSorting;
    this._product.getSortedRowModel = getSortedRowModel();

    return this;
  }

  addResizing(columnResizeMode: ColumnResizeMode): this {
    this._product.enableColumnResizing = true;
    this._product.columnResizeMode = columnResizeMode;

    return this;
  }

  build(): Partial<TableOptions<T>> {
    return this._product;
  }
}
