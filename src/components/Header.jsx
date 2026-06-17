import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import products from '../data/products.js';

const Header = () => {
  const { cartItems, user, logout } = useAppContext();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryChange = event => {
    const value = event.target.value;
    navigate(value ? `/?category=${encodeURIComponent(value)}` : '/');
  };

  return (
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-semibold text-slate-900">
            In-Crowd Brands
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-slate-900' : 'hover:text-slate-900'}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-slate-900' : 'hover:text-slate-900'}>
              Shop
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="category-select">
            Choose category
          </label>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition hover:border-slate-300"
            defaultValue=""
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 hover:bg-slate-100"
          >
            Cart
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </button>

          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 hover:bg-slate-100">
                {user.name}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
