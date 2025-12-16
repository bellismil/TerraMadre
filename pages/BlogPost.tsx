import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return <div className="pt-32 text-center">Article not found</div>;
  }

  const relatedProducts = PRODUCTS.filter(p => post.relatedProductIds?.includes(p.id));

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <span className="text-white/80 uppercase tracking-widest text-sm font-medium mb-2 block">{post.readTime} • {post.date}</span>
                <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">{post.title}</h1>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg border border-earth-100">
            <Link to="/blog" className="inline-flex items-center text-moss-600 hover:text-moss-800 mb-8 text-sm font-medium">
                <ArrowLeft size={16} className="mr-2" /> Back to Journal
            </Link>

            <div 
                className="prose prose-earth prose-lg max-w-none text-earth-700 font-serif"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-earth-200 flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                    <span key={tag} className="bg-earth-100 text-earth-600 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Shop the Story */}
        {relatedProducts.length > 0 && (
            <div className="mt-20">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl text-earth-900">Shop the Story</h2>
                    <p className="text-earth-600 mt-2">Curated products mentioned in this article.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {relatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
