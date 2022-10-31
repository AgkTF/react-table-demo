import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DSU } from '../../types';
import { createDsus } from '../../utils/create-random-dsu';
import { DSUTableTemplate } from './DSUTableTemplate';

const columnHelper = createColumnHelper<DSU>();
const data = createDsus(150);
const columns = [
  columnHelper.accessor('wellAPI', {
    header: 'well API',
  }),
  columnHelper.accessor('operatorShortName', {
    header: 'operator name',
  }),
  columnHelper.accessor('county', {
    header: 'county',
  }),
  columnHelper.accessor('state', {
    header: 'state',
  }),
  columnHelper.accessor('basin', {
    header: 'basin',
  }),
] as ColumnDef<DSU, string>[];

export function UnverifiedTable() {
  return (
    <DSUTableTemplate
      columns={columns}
      data={data}
      tableMainColor="#4a4a4a"
      tableTitle="Unverified DSUs"
    />
  );
}
