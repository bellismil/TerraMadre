import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-moss-600 uppercase tracking-widest text-sm font-bold">Educational Content Hub</span>
          <h1 className="font-serif text-4xl md:text-5xl text-earth-900 mt-3 mb-6">Cultivating Wellness</h1>
          <p className="text-earth-600 max-w-2xl mx-auto">
            Insights on herbalism, seasonal living, and conscious rituals. Deepen your knowledge of nature's medicine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map(post => (
            <article key={post.id} className="group flex flex-col">
              <div className="aspect-[3/2] overflow-hidden rounded-sm bg-earth-100 mb-6">
                <Link to={`/blog/${post.id}`}>
                    <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
              </div>
              <div className="flex items-center text-xs text-earth-500 mb-3 space-x-3 uppercase tracking-wider">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-earth-300 rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl text-earth-900 mb-3 group-hover:text-moss-700 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-earth-600 leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.id}`} className="text-moss-700 font-medium hover:text-moss-900 inline-block mt-auto">
                Read Article &rarr;
              </Link>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
