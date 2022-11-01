import { Column } from '../../components/ds/Table/ColumnAndCo/ColumnAndCo';
import { Table } from '../../components/ds/Table/Table';

type Props = {};

export function DsTable({}: Props) {
  return (
    <>
      <h2 className="font-bold text-2xl text-purple-900">DS Table</h2>

      <div className="mt-4 w-full overflow-auto max-h-[440px] relative">
        <Table tableClasses="w-full">
          {columns.map(column => (
            <Table.Column>
              <>
                {Headers.map(header => (
                  <Column.Header>
                    {/* Here goes the header component  */}
                  </Column.Header>
                ))}
              </>

              <>
                {rows.map(row => (
                  <Column.Cell>
                    {/* Here goes the Cell component  */}
                  </Column.Cell>
                ))}
              </>
            </Table.Column>
          ))}
        </Table>
      </div>
    </>
  );
}
