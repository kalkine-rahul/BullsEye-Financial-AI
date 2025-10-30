import Article from './Article';
import { Article as ArticleType } from '../types/types';

const mockArticles: ArticleType[] = [
  {
    id: '1',
    title: 'Introduction to Next.js 14',
    content: 'Next.js 14 introduces many exciting new features including the App Router, Server Components, and improved performance. In this comprehensive guide, we explore all the new capabilities and how they can benefit your projects...',
    excerpt: 'Learn about the latest features in Next.js 14 and how to use them in your projects.',
    isPremium: false,
    category: 'Technology',
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Advanced React Patterns for Enterprise Applications',
    content: 'This premium article dives deep into advanced React patterns used by top tech companies. We cover compound components, render props, higher-order components, and the latest hooks patterns. You will learn how to build scalable and maintainable React applications that can handle complex business logic...',
    excerpt: 'Master advanced React patterns used in enterprise-level applications.',
    isPremium: true,
    category: 'Programming',
    publishedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    content: 'Exploring the emerging trends and technologies that will shape web development in the coming years. From AI-assisted coding to new frameworks and performance optimization techniques...',
    excerpt: 'Discover what the future holds for web developers and the technologies to watch.',
    isPremium: false,
    category: 'Web Development',
    publishedAt: '2024-01-10'
  },
  {
    id: '4',
    title: 'Building Scalable Microservices with Node.js',
    content: 'In this premium tutorial, we build a complete microservices architecture using Node.js, Docker, and Kubernetes. Learn about service discovery, load balancing, circuit breakers, and monitoring in a distributed system...',
    excerpt: 'Learn how to build and deploy scalable microservices using modern tools and practices.',
    isPremium: true,
    category: 'Backend',
    publishedAt: '2024-01-08'
  }
];

export default function ArticlesList() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Latest Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our latest content. Some articles are premium and require your details to access.
        </p>
      </div>

      <div className="grid gap-8">
        {mockArticles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-700">
            Yellow badge indicates premium content
          </span>
        </div>
      </div>
    </div>
  );
}