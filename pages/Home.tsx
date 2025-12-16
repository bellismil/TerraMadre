import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { WellnessQuiz } from '../components/WellnessQuiz';
import { ProductRecommender } from '../components/ProductRecommender';
import { BLOG_POSTS } from '../constants';

export const Home: React.FC = () => {
  const { products, wellnessGoal } = useShop();
  
  // Get featured products (e.g., best sellers) if no wellness goal
  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/403/1920/1080" // abstract nature
            alt="Herbal aesthetic" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-white/90 uppercase tracking-[0.2em] text-sm font-medium mb-4 block animate-fade-in-up">
            Seasonal • Small Batch • Organic
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight animate-fade-in-up delay-100">
            Nature’s Intelligence, <br />
            <span className="italic">Bottled.</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
            A modern apothecary bridging ancient herbal wisdom with pure, potent ingredients to support your daily rituals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-white text-earth-900 font-medium hover:bg-earth-100 transition-colors w-full sm:w-auto"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Seed to Bottle
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness Quiz Section */}
      <section className="bg-white -mt-20 relative z-20 max-w-5xl mx-auto px-4">
        <WellnessQuiz />
      </section>

      {/* Recommended or Featured Collection */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wellnessGoal ? (
            <ProductRecommender title="Curated For You" />
        ) : (
            <>
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-earth-900 mb-3">Customer Favorites</h2>
                    <p className="text-earth-600">Loved by our community, crafted for your wellbeing.</p>
                  </div>
                  <Link to="/shop" className="hidden md:flex items-center text-moss-700 hover:text-moss-900 font-medium transition-colors">
                    View All <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
            </>
        )}
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center text-moss-700 hover:text-moss-900 font-medium">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-earth-100 py-12 border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-earth-200 p-3 rounded-full mb-4 text-earth-700">
                <Leaf size={24} />
              </div>
              <h3 className="font-serif text-lg text-earth-900 mb-2">100% Organic Ingredients</h3>
              <p className="text-earth-600 text-sm">Sourced directly from regenerative farms.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-earth-200 p-3 rounded-full mb-4 text-earth-700">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-lg text-earth-900 mb-2">Lab Tested Purity</h3>
              <p className="text-earth-600 text-sm">Rigorous testing for potency and safety.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-earth-200 p-3 rounded-full mb-4 text-earth-700">
                <Truck size={24} />
              </div>
              <h3 className="font-serif text-lg text-earth-900 mb-2">Carbon Neutral Shipping</h3>
              <p className="text-earth-600 text-sm">We offset every mile your package travels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Education Split */}
      <section className="flex flex-col md:flex-row h-auto md:h-[600px]">
        <div className="w-full md:w-1/2 relative h-[400px] md:h-full">
           <img 
            src="https://picsum.photos/id/305/900/900" 
            alt="Herbal preparation" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 bg-moss-900 text-earth-100 flex flex-col justify-center px-8 md:px-20 py-20">
          <span className="uppercase tracking-widest text-xs font-bold text-moss-300 mb-6">From The Source</span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">Hand-blended with intention in our studio.</h2>
          <p className="text-moss-200 text-lg mb-8 leading-relaxed">
            We believe that the healing power of plants is most potent when respected. 
            That's why we process our herbs whole, in small batches, aligned with the seasons. 
            No fillers, no synthetics, just pure earth medicine.
          </p>
          <Link to="/about" className="text-white border-b border-white pb-1 inline-block w-max hover:text-moss-300 hover:border-moss-300 transition-colors">
            Read Our Brand Story
          </Link>
        </div>
      </section>

      {/* Educational Hub Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
            <div>
            <span className="text-moss-600 uppercase tracking-widest text-sm font-bold block mb-2">Educational Content Hub</span>
            <h2 className="font-serif text-3xl md:text-4xl text-earth-900">Latest from the Journal</h2>
            </div>
            <Link to="/blog" className="hidden md:flex items-center text-moss-700 hover:text-moss-900 font-medium transition-colors">
            Visit the Hub <ArrowRight size={16} className="ml-2" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map(post => (
                <div key={post.id} className="group">
                    <div className="aspect-[3/2] bg-earth-100 overflow-hidden mb-4 rounded-sm">
                        <Link to={`/blog/${post.id}`}>
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </Link>
                    </div>
                    <div className="text-xs text-earth-500 mb-2 uppercase tracking-wider">{post.date} • {post.readTime}</div>
                    <h3 className="font-serif text-xl text-earth-900 mb-2 group-hover:text-moss-700 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-earth-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="text-moss-700 text-sm font-medium hover:text-moss-900">Read More &rarr;</Link>
                </div>
            ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/blog" className="inline-flex items-center text-moss-700 hover:text-moss-900 font-medium">
            Visit the Hub <ArrowRight size={16} className="ml-2" />
            </Link>
        </div>
      </section>
    </div>
  );
};
