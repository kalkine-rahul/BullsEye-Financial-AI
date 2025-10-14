export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  isPremium: boolean;
  category: string;
  publishedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  mobile: string;
}