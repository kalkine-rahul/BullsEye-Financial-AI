// app/page.tsx
import ArticlesList from '../../component/ArticleContent';

export default function Home() {
  return(
   <main className="flex min-h-screen flex-col items-center justify-between p-12 min-h-screen bg-gray-50">
       <ArticlesList />;
    </main>

  )
  

  //  min-h-screen bg-gray-50

}
