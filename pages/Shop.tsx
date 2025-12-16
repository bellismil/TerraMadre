import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { Filter } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Creating a shallow copy to sort
    result = [...result];

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } 
    // featured is default order in constants

    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-earth-900 mb-4">The Apothecary</h1>
          <p className="text-earth-600 max-w-2xl mx-auto">
            Explore our curated collection of organic botanicals, designed to nurture your body and spirit.
          </p>
        </div>

        {/* Filters & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-earth-200 gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category | 'All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-earth-800 text-white' 
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2 text-sm text-earth-700">
            <Filter size={16} />
            <span className="hidden sm:inline">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none focus:ring-0 font-medium cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-earth-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
