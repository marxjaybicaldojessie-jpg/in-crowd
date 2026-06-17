import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useAppContext();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Browse products and add items to get started.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Shopping Cart</h1>
        <p className="mt-2 text-slate-600">{cartItems.length} item(s) in your cart</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold text-rose-600 hover:text-rose-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>${(total + 10 + total * 0.1).toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/"
            className="mt-3 block w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
