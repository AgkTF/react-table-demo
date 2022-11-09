import { TractsTable, BulkDSUTables, DsTable, TractsTableByDS } from './tables';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TractsTable />} />
        <Route path="/bulk-dsu" element={<BulkDSUTables />} />
        <Route path="/ds-table" element={<DsTable />} />
        <Route path="/ds-tracts-table" element={<TractsTableByDS />} />
      </Route>
    </Routes>
  );
}

export default App;
