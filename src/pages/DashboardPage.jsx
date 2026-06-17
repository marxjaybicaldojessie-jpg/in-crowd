import { useAppContext } from '../context/AppContext.jsx';

const DashboardCard = ({ title, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    <div className="mt-4 space-y-3 text-slate-600">{children}</div>
  </section>
);

const DashboardPage = () => {
  const { user, recentlyViewed, logout } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Account Overview</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back, {user.name}</h1>
            <p className="mt-2 text-slate-600">Track orders, returns, and products you have viewed recently.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardCard title="Recently Viewed">
          {recentlyViewed.length > 0 ? (
            <ul className="space-y-3">
              {recentlyViewed.map(item => (
                <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">{item.category} — ${item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-600">No recently viewed items yet. Browse the shop to start.</p>
          )}
        </DashboardCard>

        <DashboardCard title="In-Processing Orders">
          <p className="text-slate-600">You currently have 2 orders being processed.</p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>Order #ICB-1001 · Expected delivery in 3 days</li>
            <li>Order #ICB-1002 · Preparing for shipment</li>
          </ul>
        </DashboardCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardCard title="Previous Orders">
          <ul className="space-y-4 text-sm text-slate-700">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Order #ICB-0987</p>
              <p>Delivered · 3 items · $128.50</p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Order #ICB-0964</p>
              <p>Delivered · 1 item · $45.00</p>
            </li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Returns / Refunds">
          <p className="text-slate-600">There are no active returns at this time.</p>
          <p className="text-sm text-slate-700">If you need help with a refund, visit the Help page or contact support.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardPage;
