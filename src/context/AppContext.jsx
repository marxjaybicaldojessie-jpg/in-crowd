import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const CART_STORAGE_KEY = 'inCrowdCart';
const AUTH_STORAGE_KEY = 'inCrowdAuth';
const ACCOUNTS_STORAGE_KEY = 'inCrowdAccounts';

const parseStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
};

const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => parseStored(CART_STORAGE_KEY, []));
  const [user, setUser] = useState(() => parseStored(AUTH_STORAGE_KEY, { isLoggedIn: false, name: '', email: '' }));
  const [accounts, setAccounts] = useState(() => parseStored(ACCOUNTS_STORAGE_KEY, []));
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }, [accounts]);

  const addToCart = product => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = productId => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const registerAccount = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = accounts.some(account => account.email === normalizedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newAccount = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setAccounts(prev => [...prev, newAccount]);
    setUser({ isLoggedIn: true, name: newAccount.name, email: newAccount.email });
    return { success: true };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = accounts.find(account => account.email === normalizedEmail);
    if (!account || account.password !== password) {
      return { success: false, message: 'Invalid email or password.' };
    }

    setUser({ isLoggedIn: true, name: account.name, email: account.email });
    return { success: true };
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '', email: '' });
  };

  const markViewed = product => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const value = useMemo(
    () => ({
      cartItems,
      user,
      accounts,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      registerAccount,
      login,
      logout,
      markViewed,
    }),
    [cartItems, user, accounts, recentlyViewed]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
