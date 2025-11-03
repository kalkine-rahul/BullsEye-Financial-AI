"use client";

import { useState } from "react";
import NewsSection from "../../component/NewsSection";

export default function NewsSections() {
 
  return (
  <div className="pt-12 px-4 md:px-8 min-h-screen"> 
      <div className="mb-8">
    <NewsSection/>
    </div>
       </div>
  );
}

