import { FlaggedForReviewTable } from './FlaggedForReviewTable';
import { UnverifiedTable } from './UnverifiedTable';

export function BulkDSUTables() {
  return (
    <>
      <h2 className="font-bold text-2xl text-purple-900">Bulk DSU Tables</h2>

      <div className="mt-6 space-y-10">
        <UnverifiedTable />

        <FlaggedForReviewTable />
      </div>
    </>
  );
}
