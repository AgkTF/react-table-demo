import {
  ColumnResizeMode,
  getSortedRowModel,
  SortingState,
  TableOptions,
  VisibilityState,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface Builder {
  addSorting(
    sorting: SortingState,
    setSorting: Dispatch<SetStateAction<SortingState>>
  ): this;
  addResizing(columnResizeMode: ColumnResizeMode): this;
  addColVis(
    columnVisibility: VisibilityState,
    setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
  ): this;
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

  addColVis(
    columnVisibility: VisibilityState,
    setColumnVisibility: React.Dispatch<SetStateAction<VisibilityState>>
  ): this {
    if (this._product.state) {
      this._product.state.columnVisibility = columnVisibility;
    } else {
      this._product.state = {};
      this._product.state.columnVisibility = columnVisibility;
    }
    this._product.onColumnVisibilityChange = setColumnVisibility;

    return this;
  }

  build(): Partial<TableOptions<T>> {
    return this._product;
  }
}
