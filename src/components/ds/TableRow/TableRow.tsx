import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  rowClasses: string;
};

export function TableRow({ children, rowClasses }: Props) {
  return <tr className={rowClasses}>{children}</tr>;
}
