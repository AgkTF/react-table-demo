import { ReactNode } from 'react';

type ColumnProps = {
  children: ReactNode;
};

type HeaderProps = {
  children: ReactNode;
};

type CellProps = {
  children: ReactNode;
};

function Column({ children }: ColumnProps) {
  return <>{children}</>;
}

function Header({ children }: HeaderProps) {
  return <>{children}</>;
}

function Cell({ children }: CellProps) {
  return <>{children}</>;
}

Column.Header = Header;
Column.Cell = Cell;

export { Column };
