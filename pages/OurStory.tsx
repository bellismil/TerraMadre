import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplet, FlaskConical, Package } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="bg-earth-50">
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl text-earth-900 mb-6">Seed to Bottle</h1>
        <p className="text-xl text-earth-600 leading-relaxed font-light">
          Our promise of purity starts in the soil. We believe that the most potent medicine comes from plants that have been grown with reverence, harvested at their peak, and processed with intention.
        </p>
      </section>

      {/* Step 1: Sourcing */}
      <section className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
             <img 
                src="https://picsum.photos/id/106/1200/1200" 
                alt="Organic farming" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-earth-100">
             <div className="bg-moss-200 w-16 h-16 rounded-full flex items-center justify-center text-moss-800 mb-8">
                <Leaf size={32} />
             </div>
             <span className="text-moss-600 uppercase tracking-widest text-sm font-bold mb-2">Step 01</span>
             <h2 className="font-serif text-4xl text-earth-900 mb-6">Conscious Sourcing</h2>
             <p className="text-earth-700 leading-relaxed text-lg mb-8">
                We partner exclusively with regenerative farms that prioritize soil health. No synthetic pesticides, no GMOs. Just pure, sun-drenched earth. We verify the potency of every harvest before it enters our studio.
             </p>
        </div>
      </section>

      {/* Step 2: Extraction */}
      <section className="min-h-screen flex flex-col md:flex-row-reverse">
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
             <img 
                src="https://picsum.photos/id/535/1200/1200" 
                alt="Herbal extraction" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-white">
             <div className="bg-earth-200 w-16 h-16 rounded-full flex items-center justify-center text-earth-800 mb-8">
                <Droplet size={32} />
             </div>
             <span className="text-earth-500 uppercase tracking-widest text-sm font-bold mb-2">Step 02</span>
             <h2 className="font-serif text-4xl text-earth-900 mb-6">Slow Extraction</h2>
             <p className="text-earth-700 leading-relaxed text-lg mb-8">
                Good medicine takes time. Our tinctures are macerated for a minimum of 6 weeks, often aligned with lunar cycles. Our oils are solar-infused to gently draw out the lipid-soluble compounds without damaging delicate enzymes.
             </p>
        </div>
      </section>

       {/* Step 3: Blending */}
       <section className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
             <img 
                src="https://picsum.photos/id/305/1200/1200" 
                alt="Hand blending" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-earth-800 text-earth-50">
             <div className="bg-earth-600 w-16 h-16 rounded-full flex items-center justify-center text-earth-100 mb-8">
                <FlaskConical size={32} />
             </div>
             <span className="text-earth-300 uppercase tracking-widest text-sm font-bold mb-2">Step 03</span>
             <h2 className="font-serif text-4xl mb-6">Small Batch Blending</h2>
             <p className="text-earth-100 leading-relaxed text-lg mb-8">
                Every tea blend and serum is formulated in batches of less than 50 units. This ensures that the essential oils are fresh and the energetic imprint of the product remains intact. Hand-poured, always.
             </p>
        </div>
      </section>

      {/* Step 4: Bottling */}
      <section className="min-h-screen flex flex-col md:flex-row-reverse">
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
             <img 
                src="https://picsum.photos/id/360/1200/1200" 
                alt="Bottling" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-earth-50">
             <div className="bg-moss-100 w-16 h-16 rounded-full flex items-center justify-center text-moss-700 mb-8">
                <Package size={32} />
             </div>
             <span className="text-moss-600 uppercase tracking-widest text-sm font-bold mb-2">Step 04</span>
             <h2 className="font-serif text-4xl text-earth-900 mb-6">Sustainable Packaging</h2>
             <p className="text-earth-700 leading-relaxed text-lg mb-8">
                We use miron violet glass to protect the bio-energy of our products from light degradation. Our shipping materials are compostable, recycled, and plastic-free.
             </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center bg-moss-900 text-white">
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Experience the Difference</h2>
        <p className="max-w-2xl mx-auto text-moss-100 mb-10 text-lg">
            Ready to bring the power of nature into your daily ritual?
        </p>
        <Link 
            to="/shop" 
            className="inline-flex items-center bg-white text-moss-900 px-8 py-4 font-medium hover:bg-moss-100 transition-colors"
        >
            Shop the Collection <ArrowRight className="ml-2" />
        </Link>
      </section>

    </div>
  );
};
