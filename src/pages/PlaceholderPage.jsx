const PlaceholderPage = ({ title, description }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
    <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
    <p className="mt-4 text-slate-600">{description}</p>
  </div>
);

export default PlaceholderPage;
