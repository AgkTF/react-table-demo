import { BasicTable, BulkDSUTables, DsTable } from './tables';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BasicTable />} />
        <Route path="/bulk-dsu" element={<BulkDSUTables />} />
        <Route path="/ds-table" element={<DsTable />} />
      </Route>
    </Routes>
  );
}

export default App;
