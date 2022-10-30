import { BasicTable, BulkDSUTables } from './tables';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BasicTable />} />
        <Route path="/bulk-dsu" element={<BulkDSUTables />} />
      </Route>
    </Routes>
  );
}

export default App;
