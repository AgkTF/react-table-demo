import { ReactNode } from 'react';
import { Column } from './ColumnAndCo/ColumnAndCo';

type TableProps = {
  tableClasses: string;
  children: ReactNode;
  tableRef?: React.MutableRefObject<null>;
};

function Table({ tableClasses, children, tableRef, ...restProps }: TableProps) {
  return (
    <table className={tableClasses} ref={tableRef} {...restProps}>
      {children}
    </table>
  );
}

Table.Column = Column;

export { Table };
