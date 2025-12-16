import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, cartTotal } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-earth-900/30 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-earth-50 shadow-xl flex flex-col animate-slide-in-right">
          
          <div className="flex items-center justify-between px-6 py-6 border-b border-earth-200">
            <h2 className="text-xl font-serif text-earth-900">Your Basket</h2>
            <button onClick={toggleCart} className="text-earth-500 hover:text-earth-800">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-earth-500 space-y-4">
                <p>Your basket is empty.</p>
                <button 
                  onClick={toggleCart}
                  className="text-moss-600 underline hover:text-moss-800"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex py-4 border-b border-earth-100 last:border-0">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-earth-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-earth-900">
                        <h3 className="font-serif"><a href="#">{item.name}</a></h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-earth-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-earth-300 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-earth-100 text-earth-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-earth-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-earth-100 text-earth-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-400 hover:text-red-600 flex items-center space-x-1"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-earth-200 px-6 py-6 bg-white">
              <div className="flex justify-between text-base font-medium text-earth-900 mb-4">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-earth-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className="w-full flex items-center justify-center space-x-2 rounded-none bg-earth-900 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-moss-700 transition-colors"
              >
                <span>Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
