/**
 * there are two cases here
 * the cell is either
 * 1. th
 * 2. td
 * depending on the parent.
 * So we need a way to figure out that parent.
 * passing it as a prop is not ideal here
 * So I'll create two separate components for now
 */
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cellClasses: string;
};

export function TableCell({ children, cellClasses, ...restProps }: Props) {
  return (
    <td className={cellClasses} {...restProps}>
      {children}
    </td>
  );
}
