import { Category, Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Slumber Moon Tea',
    slug: 'slumber-moon-tea',
    description: 'A calming blend of valerian root, chamomile, and lavender to gently lull you into a restorative sleep. Hand-blended for maximum potency.',
    price: 24.00,
    category: Category.TEAS,
    image: 'https://picsum.photos/id/106/800/800', // nature/plant
    benefits: ['Promotes deep sleep', 'Reduces anxiety', 'Digestive aid'],
    ingredients: 'Organic Valerian Root, Organic Chamomile Flowers, Organic Lavender, Organic Lemon Balm.',
    rating: 4.8,
    reviews: 124,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Golden Radiance Elixir',
    slug: 'golden-radiance-elixir',
    description: 'A potent turmeric and ginger tincture designed to reduce inflammation and boost immunity. A daily drop of sunshine for your internal systems.',
    price: 45.00,
    category: Category.ELIXIRS,
    image: 'https://picsum.photos/id/360/800/800', // flower/plant
    benefits: ['Anti-inflammatory', 'Immune support', 'Joint health'],
    ingredients: 'Organic Turmeric Root, Organic Ginger Root, Black Pepper, Cane Spirits, Spring Water.',
    rating: 4.9,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Forest Bath Oil',
    slug: 'forest-bath-oil',
    description: 'Bring the healing power of the forest into your home. A grounding blend of cedarwood, pine, and bergamot essential oils.',
    price: 32.00,
    category: Category.OILS,
    image: 'https://picsum.photos/id/319/800/800', // coffee/brown tone
    benefits: ['Grounding', 'Respiratory support', 'Mental clarity'],
    ingredients: 'Cedrus atlantica (Cedarwood), Pinus sylvestris (Pine), Citrus bergamia (Bergamot).',
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Rose & Clay Mask',
    slug: 'rose-clay-mask',
    description: 'A detoxifying pink clay mask infused with rose petals to gently purify pores without stripping moisture. Ideal for sensitive skin.',
    price: 38.00,
    category: Category.SKINCARE,
    image: 'https://picsum.photos/id/433/800/800', // pinkish/warm
    benefits: ['Detoxifying', 'Soothing', 'Brightening'],
    ingredients: 'French Pink Clay, Organic Rose Petal Powder, Kaolin Clay, Geranium Oil.',
    rating: 4.6,
    reviews: 42
  },
  {
    id: '5',
    name: 'Digestive Harmony Tea',
    slug: 'digestive-harmony-tea',
    description: 'Soothe your gut with peppermint, fennel, and ginger. Perfect after meals to ease bloating and improve digestion.',
    price: 22.00,
    category: Category.TEAS,
    image: 'https://picsum.photos/id/225/800/800', // tea/cup
    benefits: ['Relieves bloating', 'Gut health', 'Refreshing'],
    ingredients: 'Organic Peppermint, Organic Fennel Seed, Organic Ginger, Organic Licorice Root.',
    rating: 4.9,
    reviews: 210,
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Vitality Mushroom Blend',
    slug: 'vitality-mushroom-blend',
    description: 'A dual-extracted elixir of Reishi, Chaga, and Lion\'s Mane. Support cognitive function and energy levels naturally.',
    price: 55.00,
    category: Category.ELIXIRS,
    image: 'https://picsum.photos/id/535/800/800',
    benefits: ['Focus', 'Energy', 'Adaptogenic'],
    ingredients: 'Organic Reishi, Organic Chaga, Organic Lion\'s Mane, Cane Alcohol.',
    rating: 4.8,
    reviews: 75
  },
  {
    id: '7',
    name: 'Midnight Recovery Serum',
    slug: 'midnight-recovery-serum',
    description: 'Restorative face oil with Blue Tansy and Jojoba. Repairs skin barrier while you sleep.',
    price: 68.00,
    category: Category.SKINCARE,
    image: 'https://picsum.photos/id/646/800/800',
    benefits: ['Hydrating', 'Anti-aging', 'Calming'],
    ingredients: 'Organic Jojoba Oil, Blue Tansy, Vitamin E, Squalane.',
    rating: 5.0,
    reviews: 30,
    isNew: true
  },
  {
    id: '8',
    name: 'Lavender Absolute',
    slug: 'lavender-absolute',
    description: 'Pure, steam-distilled French Lavender. The swiss army knife of essential oils.',
    price: 28.00,
    category: Category.OILS,
    image: 'https://picsum.photos/id/627/800/800',
    benefits: ['Relaxation', 'Skin healing', 'Sleep'],
    ingredients: 'Lavandula angustifolia.',
    rating: 4.9,
    reviews: 340
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Tea Ceremony',
    excerpt: 'Discover how the ancient ritual of tea can ground you in the present moment.',
    content: `
      <p>In our fast-paced world, the act of preparing tea offers a rare moment of stillness. It is not just about hydration, but about intention.</p>
      <h3>The Water</h3>
      <p>Start with fresh, cold spring water. The quality of your water directly affects the flavor profile of the herbs.</p>
      <h3>The Temperature</h3>
      <p>For herbal tisanes, boiling water (212°F) is usually best to extract the medicinal compounds from roots and dried leaves. However, delicate flowers like Chamomile prefer slightly cooler water (around 200°F).</p>
      <h3>The Steep</h3>
      <p>Patience is key. Cover your cup to keep the volatile oils from escaping in the steam. Let it steep for at least 7-10 minutes.</p>
      <p>As you wait, breathe deeply. Let the aroma fill your senses. This is the first step of the medicine taking effect.</p>
    `,
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/id/225/600/400',
    readTime: '5 min read',
    relatedProductIds: ['1', '5'],
    tags: ['Rituals', 'Tea', 'Mindfulness']
  },
  {
    id: '2',
    title: 'Understanding Adaptogens',
    excerpt: 'What are adaptogens and why are they suddenly everywhere? We break it down.',
    content: `
      <p>Adaptogens are a unique class of healing plants: They help restore the body's balance and help the body cope with physical and mental stress.</p>
      <h3>How Do They Work?</h3>
      <p>Think of adaptogens like a thermostat. When the thermostat senses that the room is too hot, it brings the temperature down; when it’s too cold, it brings it up. Adaptogens can calm you down and boost your energy at the same time without overstimulating.</p>
      <h3>Key Adaptogens</h3>
      <ul>
        <li><strong>Ashwagandha:</strong> Known for its ability to reduce stress and anxiety.</li>
        <li><strong>Reishi:</strong> The "Queen of Mushrooms," used for immune support and spiritual potency.</li>
        <li><strong>Lion's Mane:</strong> Excellent for cognitive function and focus.</li>
      </ul>
      <p>Incorporating these into your daily routine can build a reservoir of resilience over time.</p>
    `,
    date: 'Sep 28, 2023',
    image: 'https://picsum.photos/id/535/600/400',
    readTime: '7 min read',
    relatedProductIds: ['6', '2'],
    tags: ['Education', 'Herbs', 'Stress']
  },
  {
    id: '3',
    title: 'Seasonal Living: Autumn',
    excerpt: 'Herbs and practices to support your body as the days grow shorter.',
    content: `
      <p>As the leaves turn and the air grows crisp, our bodies naturally crave grounding and warmth. In Traditional Chinese Medicine, Autumn is associated with the Metal element and the Lungs.</p>
      <h3>Immune Support</h3>
      <p>This is the time to start fortifying your immune system. Roots like Ginger and Turmeric are warming and stimulating.</p>
      <h3>Skin Care Transition</h3>
      <p>The drop in humidity can dry out the skin. Switch to heavier, oil-based serums to lock in moisture. Ingredients like Jojoba and Blue Tansy are excellent for repairing wind-chapped skin.</p>
      <h3>Rituals</h3>
      <p>Take longer, warmer baths. Add essential oils like Cedarwood or Pine to connect with the deep, earthy energy of the season.</p>
    `,
    date: 'Sep 15, 2023',
    image: 'https://picsum.photos/id/106/600/400',
    readTime: '6 min read',
    relatedProductIds: ['3', '7', '2'],
    tags: ['Seasonal', 'Lifestyle', 'Autumn']
  }
];
