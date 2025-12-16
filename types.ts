export enum Category {
  TEAS = 'Medicinal Teas',
  ELIXIRS = 'Herbal Elixirs',
  OILS = 'Essential Oils',
  SKINCARE = 'Natural Skincare',
  BUNDLES = 'Wellness Bundles'
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  benefits: string[];
  ingredients: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  date: string;
  image: string;
  readTime: string;
  relatedProductIds: string[];
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
