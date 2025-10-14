'use client';

import { useState } from 'react';
import { Article as ArticleType } from '../types/types';
import LeadFormModal from './LeadFormModal';

interface ArticleProps {
    article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleUnlock = () => {
        setShowModal(true);
    };

    const handleUnlockSuccess = () => {
        setIsUnlocked(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                            {article.category}
                        </span>
                        {article.isPremium && (
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Premium
                            </span>
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {article.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Published on {formatDate(article.publishedAt)}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {article.isPremium && !isUnlocked ? (
                        <div className="text-center py-8">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Premium Content Locked
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                This is a premium article. Please provide your details to unlock and read the full content.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleUnlock}
                                    className="inline-flex items-center px-6 py-3 font-medium transition-colors border-4 border-dashed border-b-indigo-950 p-6 rounded-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Unlock Article
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {article.isPremium ? article.content : article.content}
                            </p>
                            {article.isPremium && isUnlocked && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700 text-sm flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Premium content unlocked
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </article>

            <LeadFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={handleUnlockSuccess}
                articleTitle={article.title}
            />
        </>
    );
}