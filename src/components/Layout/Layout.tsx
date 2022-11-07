import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <section className="py-3 px-4">
      <nav className="my-3 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="font-semibold hover:text-purple-500 hover:underline"
        >
          Tracts Table
        </Link>

        <Link
          to="/bulk-dsu"
          className="font-semibold hover:text-purple-500 hover:underline"
        >
          Bulk DSU
        </Link>
      </nav>

      <Outlet />
    </section>
  );
}
