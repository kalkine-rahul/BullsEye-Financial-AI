'use client';

import { usePathname } from 'next/navigation';
import Landing from '@/component/Landing';
import ChatWidget from '../component/ChatWidget'; 
import MarketData from '../component/MarketData';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage ? (
        <>
          <Landing />
          <ChatWidget />
          <MarketData />
        </>
      ) : (
        children
      )}
    </>
  );
}