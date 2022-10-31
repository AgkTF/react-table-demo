import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DSU } from '../../types';
import { createDsus } from '../../utils/create-random-dsu';
import { DSUTableTemplate } from './DSUTableTemplate';

const columnHelper = createColumnHelper<DSU>();
const data = createDsus(5);

const columns = [
  columnHelper.accessor('wellAPI', {
    header: 'well API',
  }),
  columnHelper.accessor('operatorShortName', {
    header: 'operator name',
  }),
  columnHelper.accessor('acres', {
    header: 'acres QQ',
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
  columnHelper.accessor('location', {
    header: 'location',
  }),
  columnHelper.accessor('lateralLength', {
    header: 'lateral Length',
  }),
  columnHelper.accessor('formations', {
    header: 'formations',
  }),
  columnHelper.accessor('lastModifiedDate', {
    header: 'last Modified Date',
  }),
] as ColumnDef<DSU, string>[];

export function VerifiedTable() {
  return (
    <DSUTableTemplate
      columns={columns}
      data={data}
      tableMainColor="#2d5f65"
      tableTitle="Verified DSUs"
    />
  );
}
