import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductRecommenderProps {
  currentProductId?: string;
  title?: string;
  limit?: number;
}

export const ProductRecommender: React.FC<ProductRecommenderProps> = ({ 
  currentProductId, 
  title = "Recommended for You",
  limit = 4 
}) => {
  const { products, wellnessGoal, viewedItems, cart } = useShop();

  const recommendations = useMemo(() => {
    let scores = new Map<string, number>();

    products.forEach(p => {
      if (p.id === currentProductId) return; // Don't recommend current product
      scores.set(p.id, 0);
    });

    // 1. Weight by Wellness Goal
    if (wellnessGoal) {
      products.forEach(p => {
        if (p.id === currentProductId) return;
        const goalKeywords: Record<string, string[]> = {
            'Sleep': ['sleep', 'calm', 'relax', 'lavender', 'valerian'],
            'Energy': ['energy', 'focus', 'alert', 'vitality'],
            'Stress': ['stress', 'anxiety', 'calm', 'adaptogen'],
            'Detox': ['detox', 'digest', 'gut', 'bloat', 'cleanse'],
            'Skin': ['skin', 'glow', 'hydrate', 'face', 'mask']
        };

        const keywords = goalKeywords[wellnessGoal] || [];
        const matches = keywords.some(k => 
            p.description.toLowerCase().includes(k) || 
            p.benefits.some(b => b.toLowerCase().includes(k)) ||
            p.name.toLowerCase().includes(k)
        );

        if (matches) {
            scores.set(p.id, (scores.get(p.id) || 0) + 10);
        }
      });
    }

    // 2. Weight by Viewed History (Collaborative filtering simulation - item similarity)
    // If I viewed Tea A, recommend Tea B.
    const recentlyViewed = products.filter(p => viewedItems.includes(p.id));
    recentlyViewed.forEach(viewed => {
        products.forEach(candidate => {
            if (candidate.id === currentProductId || candidate.id === viewed.id) return;
            
            // Same category
            if (candidate.category === viewed.category) {
                scores.set(candidate.id, (scores.get(candidate.id) || 0) + 2);
            }
        });
    });

    // 3. Weight by Cart (Complementary)
    // Simple logic: if cart has Tea, recommend Oil or Cup (cross-category)
    cart.forEach(cartItem => {
         products.forEach(candidate => {
            if (candidate.id === currentProductId || candidate.id === cartItem.id) return;

            // Boost different categories (simple cross-sell)
            if (candidate.category !== cartItem.category) {
                 scores.set(candidate.id, (scores.get(candidate.id) || 0) + 1);
            }
         });
    });

    // Sort by score
    const sortedIds = Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    return products
        .filter(p => sortedIds.includes(p.id))
        .sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id))
        .slice(0, limit);

  }, [products, wellnessGoal, viewedItems, cart, currentProductId, limit]);

  if (recommendations.length === 0) return null;

  return (
    <div className="py-12">
      <h3 className="font-serif text-2xl text-earth-900 mb-8">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
