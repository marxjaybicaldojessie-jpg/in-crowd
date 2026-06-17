import { Link, useSearchParams } from 'react-router-dom';
import products from '../data/products.js';
import { useAppContext } from '../context/AppContext.jsx';

const HomePage = () => {
  const { addToCart } = useAppContext();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  const trendingProducts = products.slice(0, 8);
  const featuredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory).slice(0, 8)
    : trendingProducts;

  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-12 text-white shadow-lg shadow-slate-300/10 sm:px-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Trending Marketplace</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Fresh drops from In-Crowd Brands</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200">Shop curated favorites, newest streetwear essentials, and trending lifestyle pieces selected just for you.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Trending products</h2>
            <p className="text-sm text-slate-600">{selectedCategory ? `Top picks in ${selectedCategory}` : 'The hottest products this week.'}</p>
          </div>
          <Link
            to="/"
            className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map(product => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-md">
              <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="text-base font-semibold text-slate-900 hover:text-slate-700">
                  {product.name}
                </Link>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-slate-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
