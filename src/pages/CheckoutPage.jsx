import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const CheckoutPage = () => {
  const { cartItems, user } = useAppContext();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  if (!user.isLoggedIn) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Please log in to checkout</h1>
        <p className="mt-4 text-slate-600">You need to be logged in to complete your purchase.</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-green-50 p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-green-700 font-semibold">Success</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Order Placed!</h1>
        <p className="mt-4 text-slate-600">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
        <div className="mt-6 space-y-2 rounded-2xl bg-white p-4">
          <p className="text-sm text-slate-600">Order total: <span className="font-semibold text-slate-900">${grandTotal.toFixed(2)}</span></p>
          <p className="text-sm text-slate-600">Confirmation email sent to {user.email}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-slate-600">Complete your purchase</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Shipping Address</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  disabled
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">ZIP</label>
                  <input
                    type="text"
                    placeholder="10001"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Payment Method</h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-3 rounded-2xl border-2 border-slate-900 bg-slate-50 p-4">
                <input type="radio" name="payment" defaultChecked className="h-4 w-4" />
                <span className="text-sm font-medium text-slate-900">Credit Card</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-slate-700">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Exp. Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none focus:border-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
          <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-3 max-h-48 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.name} × {item.quantity}</span>
                <span className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-200 pt-4 space-y-3">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => setOrderPlaced(true)}
            className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
