import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-earth-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-moss-600 text-white text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
            New
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-2 left-2 bg-earth-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
            Best Seller
          </div>
        )}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full text-earth-800 shadow-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:text-moss-600"
          title="Add to Cart"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-serif text-earth-900 hover:text-moss-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm font-medium text-earth-900">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-xs text-earth-500 uppercase tracking-widest mt-1">{product.category}</p>
        
        <div className="mt-2 flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
             <Star 
               key={i} 
               size={12} 
               className={`${i < Math.floor(product.rating) ? 'text-earth-400 fill-earth-400' : 'text-earth-200'}`} 
             />
          ))}
          <span className="text-xs text-earth-400 ml-1">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};
