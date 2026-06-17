import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useAppContext();
  return user.isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <AppProvider>
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/help" element={<PlaceholderPage title="Help" description="How can we assist you?" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms" description="Marketplace terms and conditions." />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy" description="Privacy policy details." />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" description="We couldn't find the page you're looking for." />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </AppProvider>
);

export default App;
