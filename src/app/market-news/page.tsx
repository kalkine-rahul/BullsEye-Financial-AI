// app/market-new/page.tsx
import React from 'react';
import NewsFeed from '../../component/NewsFeed';
import './market.css';

const NewsPage: React.FC = () => {
  return (
    <div className="pt-12 px-4 md:px-8 min-h-screen">
      <NewsFeed />
    </div>
  );
};

export default NewsPage;

