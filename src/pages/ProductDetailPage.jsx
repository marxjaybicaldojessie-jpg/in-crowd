import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.js';
import { useAppContext } from '../context/AppContext.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(item => item.id === Number(id));
  const { addToCart, markViewed } = useAppContext();

  useEffect(() => {
    if (product) {
      markViewed(product);
    }
  }, [product, markViewed]);

  if (!product) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Product not found</h2>
        <p className="mt-4 text-slate-600">Please return to the shop and choose another item.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-700">
          Back to Shop
        </Link>
      </div>
    );
  }

  const similarProducts = products.filter(
    item => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.name}</h1>
            <p className="mt-4 text-slate-600">{product.description}</p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Price</span>
              <span className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Add to Cart
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Product Specs</h2>
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <table className="w-full border-collapse text-sm text-slate-700">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-slate-200 last:border-0">
                      <td className="px-4 py-4 font-semibold uppercase tracking-[0.08em] text-slate-500">{key}</td>
                      <td className="px-4 py-4">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Similar Products</h2>
          <span className="text-sm text-slate-500">Category: {product.category}</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {similarProducts.map(item => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <Link to={`/product/${item.id}`}>
                <img src={item.imageUrl} alt={item.name} className="h-44 w-full object-cover" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${item.id}`} className="font-semibold text-slate-900 hover:text-slate-700">
                  {item.name}
                </Link>
                <p className="mt-2 text-sm text-slate-500">${item.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
