import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../constants';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  viewedItems: string[];
  wellnessGoal: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  addToViewed: (productId: string) => void;
  setWellnessGoal: (goal: string | null) => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewedItems, setViewedItems] = useState<string[]>([]);
  const [wellnessGoal, setWellnessGoal] = useState<string | null>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('terraMaterCart');
    const savedViewed = localStorage.getItem('terraMaterViewed');
    const savedGoal = localStorage.getItem('terraMaterGoal');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    if (savedViewed) {
      try {
        setViewedItems(JSON.parse(savedViewed));
      } catch (e) {
        console.error("Failed to parse viewed items", e);
      }
    }
    if (savedGoal) {
      setWellnessGoal(savedGoal);
    }
  }, []);

  // Save state to local storage on change
  useEffect(() => {
    localStorage.setItem('terraMaterCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('terraMaterViewed', JSON.stringify(viewedItems));
  }, [viewedItems]);

  useEffect(() => {
    if (wellnessGoal) {
      localStorage.setItem('terraMaterGoal', wellnessGoal);
    } else {
      localStorage.removeItem('terraMaterGoal');
    }
  }, [wellnessGoal]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const addToViewed = (productId: string) => {
    setViewedItems(prev => {
      // Remove if exists, add to front (LRU style but simpler)
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products: PRODUCTS,
      cart,
      isCartOpen,
      viewedItems,
      wellnessGoal,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      addToViewed,
      setWellnessGoal,
      cartTotal,
      cartCount
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
