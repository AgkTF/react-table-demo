import { UnverifiedTable } from './UnverifiedTable';

export function BulkDSUTables() {
  return (
    <>
      <h2 className="font-bold text-2xl text-purple-900">Bulk DSU Tables</h2>

      <div className="mt-6 space-y-4">
        <UnverifiedTable />
      </div>
    </>
  );
}
