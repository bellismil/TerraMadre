import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductRecommender } from '../components/ProductRecommender';
import { Star, Minus, Plus, Share2, Shield, Leaf, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, addToViewed } = useShop();
  const [qty, setQty] = React.useState(1);
  
  // Scroll to top on mount and update viewed history
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
        addToViewed(id);
    }
  }, [id, addToViewed]);

  const product = products.find(p => p.id === id);

  // Smart filtering for related articles
  const relatedArticles = useMemo(() => {
    if (!product) return [];
    
    return BLOG_POSTS.filter(post => {
      // 1. Explicit connection (strongest signal)
      if (post.relatedProductIds?.includes(product.id)) return true;

      const lowerTags = post.tags.map(t => t.toLowerCase());
      const lowerTitle = post.title.toLowerCase();
      
      // 2. Category Match
      // e.g. "Medicinal Teas" matches tag "Tea"
      const categoryWords = product.category.toLowerCase().split(' ');
      const hasCategoryMatch = categoryWords.some(word => {
         if (word.length < 3) return false;
         // Simple singularization check
         const baseWord = word.endsWith('s') ? word.slice(0, -1) : word;
         return lowerTags.some(tag => tag.includes(baseWord)) || lowerTitle.includes(baseWord);
      });
      if (hasCategoryMatch) return true;

      // 3. Benefits Match
      // e.g. "Sleep" benefit matches "Sleep" tag or title
      const benefitWords = product.benefits.join(' ').toLowerCase().split(' ');
      const hasBenefitMatch = benefitWords.some(word => {
         // Filter out common small words to avoid false positives
         if (word.length < 4 || ['helps', 'with', 'from', 'your', 'body'].includes(word)) return false;
         return lowerTags.includes(word) || lowerTitle.includes(word);
      });

      return hasBenefitMatch;
    });
  }, [product]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-earth-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-moss-600 underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-earth-500 mb-8">
          <Link to="/" className="hover:text-earth-900">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-earth-900">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-earth-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery - simplified for this demo */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-earth-100 rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold text-moss-700 uppercase tracking-widest">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-earth-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-2xl font-medium text-earth-900">${product.price.toFixed(2)}</p>
              <div className="flex items-center space-x-1 border-l border-earth-300 pl-4">
                 {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < Math.floor(product.rating) ? 'text-earth-400 fill-earth-400' : 'text-earth-200'}`} 
                    />
                 ))}
                 <span className="text-sm text-earth-500 ml-1">{product.reviews} Reviews</span>
              </div>
            </div>

            <div className="prose prose-earth text-earth-600 mb-8">
              <p>{product.description}</p>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-earth-900 uppercase tracking-wide mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-earth-700">
                    <Leaf size={16} className="text-moss-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 pt-6 border-t border-earth-200">
              <div className="flex items-center border border-earth-300 w-max rounded-md">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-earth-50 text-earth-600"><Minus size={16} /></button>
                <span className="px-4 font-medium text-earth-900 min-w-[2rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-earth-50 text-earth-600"><Plus size={16} /></button>
              </div>
              <button 
                onClick={() => {
                   for(let i = 0; i < qty; i++) addToCart(product);
                }}
                className="flex-1 bg-earth-900 text-white py-3 px-8 font-medium hover:bg-moss-700 transition-colors shadow-md"
              >
                Add to Cart - ${(product.price * qty).toFixed(2)}
              </button>
            </div>
            
            {/* Ingredients Accordion-ish */}
            <div className="border-t border-earth-200 py-4">
                <h3 className="text-sm font-bold text-earth-900 mb-2">Ingredients</h3>
                <p className="text-sm text-earth-600 leading-relaxed italic">{product.ingredients}</p>
            </div>

            <div className="flex items-center space-x-6 text-xs text-earth-500 pt-4">
               <div className="flex items-center"><Shield size={14} className="mr-1"/> 100% Organic</div>
               <div className="flex items-center"><Share2 size={14} className="mr-1"/> Share</div>
            </div>

          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
            <div className="mt-20 border-t border-earth-200 pt-12">
                <h3 className="font-serif text-2xl text-earth-900 mb-6 flex items-center">
                    <BookOpen size={24} className="mr-2 text-moss-600" />
                    Deepen Your Knowledge
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedArticles.map(post => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-4 items-start p-4 rounded-lg hover:bg-earth-50 transition-colors">
                             <div className="w-24 h-24 flex-shrink-0 bg-earth-100 overflow-hidden rounded-md">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <h4 className="font-serif text-lg text-earth-900 group-hover:text-moss-700">{post.title}</h4>
                                <p className="text-xs text-earth-500 mt-1 uppercase">{post.readTime}</p>
                                <p className="text-xs text-earth-600 mt-2 line-clamp-2">{post.excerpt}</p>
                             </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        {/* Recommendations */}
        <div className="mt-12 border-t border-earth-200 pt-12">
             <ProductRecommender currentProductId={product.id} title="You May Also Like" />
        </div>

      </div>
    </div>
  );
};
