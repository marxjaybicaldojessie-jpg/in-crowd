import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-white py-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">In-Crowd Brands</p>
        <p className="mt-2 max-w-xl text-sm text-slate-600">A modern marketplace for curated style, streetwear, and essentials.</p>
      </div>
      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <Link className="hover:text-slate-900" to="/help">Help</Link>
        <Link className="hover:text-slate-900" to="/terms">Terms</Link>
        <Link className="hover:text-slate-900" to="/privacy">Privacy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
