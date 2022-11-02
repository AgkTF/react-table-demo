import { ReactNode } from 'react';

type TableProps = {
  tableClasses: string;
  children: ReactNode;
  tableRef?: React.MutableRefObject<null>;
};

export function Table({
  tableClasses,
  children,
  tableRef,
  ...restProps
}: TableProps) {
  return (
    <table className={tableClasses} ref={tableRef} {...restProps}>
      {children}
    </table>
  );
}
