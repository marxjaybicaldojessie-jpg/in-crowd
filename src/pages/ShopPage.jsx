import { Link } from 'react-router-dom';
import products from '../data/products.js';
import { useAppContext } from '../context/AppContext.jsx';

const ShopPage = () => {
  const { addToCart } = useAppContext();

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shop</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">All products</h1>
          <p className="mt-3 text-slate-600">Browse the full In-Crowd Brands catalog of 200 curated products.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map(product => (
          <article key={product.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="h-64 w-full object-cover" />
            </Link>
            <div className="p-5">
              <Link to={`/product/${product.id}`} className="text-lg font-semibold text-slate-900 hover:text-slate-700">
                {product.name}
              </Link>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
