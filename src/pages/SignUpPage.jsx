import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const SignUpPage = () => {
  const { registerAccount } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = registerAccount({ name, email, password });
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Create account</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Join In-Crowd Brands</h1>
          <p className="mt-2 text-slate-600">Create an account so you can save orders, view your dashboard, and shop faster.</p>
        </div>

        {error && <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
