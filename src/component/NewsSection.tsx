"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Types
interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  image: string;
  timeAgo?: string;
  tags?: string[];
}

interface TrendingArticle {
  id: number;
  title: string;
  timeAgo: string;
  readTime: string;
}

// Mock data
const heroSlides = [
  {
    id: 1,
    title: "Announcing AdventureWeek at Okinawa",
    tags: ["Editor Choice", "Adventure Event"],
    readTime: "5 mins read",
    image: "/lake-list-news.jpeg"
  }
];

const navigationArticles = [
  { id: 1, title: "Protecting Animals and Nature in Adventure Travel" },
  { id: 2, title: "Guides are the Storytellers of Destinations" },
  { id: 3, title: "Together to Promote Sustainable Development" },
  { id: 4, title: "Empowers Adventure Operations in Nyrgyzstan" },
  { id: 5, title: "Sustainable Tourism Initiatives 2024" }
];

const featuredStories: Article[] = [
  {
    id: 1,
    title: "Global Family Travels Climate Education",
    category: "Education",
    readTime: "4 min read",
    image: "/news-dataone.webp"
  },
  {
    id: 2,
    title: "The Sustainable Future of Asia Tourism",
    category: "Tourism",
    readTime: "6 min read",
    image: "https://www.danflyingsolo.com/wp-content/uploads/2025/04/Maya-Bay-Thailand.jpg"
  },
  {
    id: 3,
    title: "We All Share Atmospheric Circulation",
    category: "Environment",
    readTime: "3 min read",
    image: "/atmospheric_circulation.jpeg"
  },
  {
    id: 4,
    title: "Cube Verde: The Next Hiking Destination",
    category: "Destination",
    readTime: "5 min read",
    image: "/hiking-des-news.jpg"
  },
  {
    id: 5,
    title: "LifeStraw's New Go Series Water Filter Bottles",
    category: "Gear",
    readTime: "4 min read",
    image: "/water-bottle-news.jpg"
  }
];

const latestStories: Article[] = [
  {
    id: 1,
    title: "How to enjoy an outdoor adventure – in the Lake District and beyond",
    category: "Adventures",
    readTime: "5 min read",
    timeAgo: "2 hours ago",
    image: "/lake-list-news.jpeg",
    tags: ["Hiking", "Beginners"]
  },
  {
    id: 2,
    title: "Inside 75-Year-Old Will French's Globe-Trotting Adventure on the International Appalachian Trail",
    category: "Inspiration",
    readTime: "7 min read",
    timeAgo: "1 day ago",
    image: "/lake-list-news.jpeg",
    tags: ["Hiking", "Senior Travel"]
  },
  {
    id: 3,
    title: "The Rise of Eco-Friendly Adventure Gear in 2024",
    category: "Gear",
    readTime: "4 min read",
    timeAgo: "3 hours ago",
    image: "/lake-list-news.jpeg",
    tags: ["Sustainability", "Reviews"]
  }
];

const trendingStories: TrendingArticle[] = [
  {
    id: 1,
    title: "These Brides Are Trying to Kill Us",
    timeAgo: "1 hour ago",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "A Last Hiker Used an Online Bear Camera to Call for Rescue",
    timeAgo: "2 hours ago",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Tourists Chasing a Bear Is the Dumbest Yellowstone Video Yet",
    timeAgo: "3 hours ago",
    readTime: "2 min read"
  },
  {
    id: 4,
    title: "Let's All Agree to Stop Stealing Hawaii's Lava Rocks",
    timeAgo: "5 hours ago",
    readTime: "5 min read"
  },
  {
    id: 5,
    title: "The Ultimate Guide to Solo Mountain Climbing",
    timeAgo: "6 hours ago",
    readTime: "6 min read"
  }
];

export default function AdventureHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNav, setActiveNav] = useState(1);

  // Auto-slide hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
         <Image
  src="/adventure-news-hero.avif"
  alt="Kayaking in tropical sea"
  fill
  className="object-cover"
  priority
/>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-2xl">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {heroSlides[currentSlide].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Main Title */}
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              {/* Read Story & Meta */}
              <div className="flex items-center gap-6">
                <button className="group bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Read Story
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="text-sm">{heroSlides[currentSlide].readTime}</span>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-teal-500 scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Numbered Navigation Strip */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex overflow-x-auto scrollbar-hide py-6 gap-8">
            {navigationArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => setActiveNav(article.id)}
                className={`flex items-center gap-4 min-w-max group transition-all ${
                  activeNav === article.id ? 'text-teal-500' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`text-2xl font-bold transition-all ${
                  activeNav === article.id ? 'text-teal-500' : 'text-gray-300 group-hover:text-gray-400'
                }`}>
                  {article.id}
                </span>
                <span className="text-lg font-medium text-left max-w-xs">
                  {article.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Featured & Latest */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Featured Stories */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 relative">
                  Featured Stories
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-teal-500 rounded-full"></div>
                </h2>
                <button className="text-teal-500 hover:text-teal-600 font-medium transition-colors">
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {featuredStories.map((story) => (
                  <article
                    key={story.id}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-teal-500 transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{story.readTime}</span>
                        <button className="text-teal-500 hover:text-teal-600 font-medium">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* The Latest */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 relative">
                The Latest
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-teal-500 rounded-full"></div>
              </h2>

              <div className="space-y-8">
                {latestStories.map((story) => (
                  <article
                    key={story.id}
                    className="group cursor-pointer flex gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 relative w-32 h-32 rounded-xl overflow-hidden">
                      <Image
                        src="/lake-list-news.jpeg"
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                          {story.category}
                        </span>
                        {story.tags && (
                          <div className="flex gap-2">
                            {story.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-teal-500 transition-colors line-clamp-2">
                        {story.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {story.timeAgo && <span>{story.timeAgo}</span>}
                          <span>{story.readTime}</span>
                        </div>
                        <button className="text-teal-500 hover:text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read Story →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Trending */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Trending Section */}
              <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">On Trending</h2>
                </div>

                <div className="space-y-4">
                  {trendingStories.map((story, index) => (
                    <article
                      key={story.id}
                      className="group cursor-pointer p-4 rounded-xl bg-white hover:bg-teal-50 transition-all duration-200 border border-transparent hover:border-teal-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                            {story.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{story.timeAgo}</span>
                            <span>•</span>
                            <span>{story.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <button className="w-full mt-6 text-center text-teal-500 hover:text-teal-600 font-medium transition-colors">
                  View All Trending →
                </button>
              </section>

              {/* Newsletter Signup */}
              <section className="mt-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Adventure Awaits</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Get weekly adventure stories, gear reviews, and travel tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-300 border-2 focus:border-white placeholder-black"
                  />
                  <button className="w-full border border-b-amber-50 text-teal-600 py-3 rounded-lg font-semibold transition-colors">
                    Subscribe
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}