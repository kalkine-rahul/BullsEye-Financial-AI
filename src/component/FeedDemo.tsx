'use client';
import React, { useState, useEffect } from 'react';

export default function FeedDemo() {
  // ✅ Adaptive user profile (learns as you interact)
  const [userProfile, setUserProfile] = useState({
    likedAuthors: {},
    likedTypes: { text: 1, photo: 1, video: 1 },
    likedRelations: { friend: 1, closeFriend: 1, page: 1 },
  });

  // 📰 Sample posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Amit Verma',
      type: 'photo',
      relation: 'friend',
      content: 'Just adopted a puppy 🐶',
      likes: 20,
      comments: 3,
      timePosted: Date.now() - 1000 * 60 * 60 * 1.5,
    },
    {
      id: 2,
      author: 'Neha Sharma',
      type: 'video',
      relation: 'closeFriend',
      content: 'New dance vlog 💃',
      likes: 40,
      comments: 10,
      timePosted: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: 3,
      author: 'Ravi Patel',
      type: 'text',
      relation: 'page',
      content: 'Top 5 mutual funds to invest in 2025 📊',
      likes: 15,
      comments: 4,
      timePosted: Date.now() - 1000 * 60 * 60 * 8,
    },
    {
      id: 4,
      author: 'Sneha Kapoor',
      type: 'video',
      relation: 'friend',
      content: 'My trip to Ladakh 🏔️',
      likes: 12,
      comments: 3,
      timePosted: Date.now() - 1000 * 60 * 60 * 0.5,
    },
  ]);

  // ⚙️ Dynamic ranking function
  const rankPosts = (list) => {
    return list
      .map((p) => {
        const ageInHours = (Date.now() - p.timePosted) / (1000 * 60 * 60);
        const timeDecay = Math.max(0, 1 - ageInHours / 24);

        // Base score
        let score =
          0.5 * p.likes +
          0.3 * p.comments +
          0.2 * timeDecay * 100;

        // Apply learned preferences
        score *= userProfile.likedTypes[p.type] || 1;
        score *= userProfile.likedRelations[p.relation] || 1;
        score *= userProfile.likedAuthors[p.author] || 1;

        return { ...p, score: parseFloat(score.toFixed(2)) };
      })
      .sort((a, b) => b.score - a.score);
  };

  const [ranked, setRanked] = useState(rankPosts(posts));

  // 🔁 Update feed whenever posts or preferences change
  useEffect(() => {
    setRanked(rankPosts(posts));
  }, [posts, userProfile]);

  // ❤️ Like handler with adaptive learning
  const handleLike = (post) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
    );

    // Update learned preferences dynamically
    setUserProfile((prev) => ({
      likedAuthors: {
        ...prev.likedAuthors,
        [post.author]: (prev.likedAuthors[post.author] || 1) + 0.1,
      },
      likedTypes: {
        ...prev.likedTypes,
        [post.type]: (prev.likedTypes[post.type] || 1) + 0.05,
      },
      likedRelations: {
        ...prev.likedRelations,
        [post.relation]: (prev.likedRelations[post.relation] || 1) + 0.05,
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        🤖 Adaptive Smart Feed (Self-Learning)
      </h1>

      <div className="bg-gray-50 border rounded-xl p-3 mb-6 text-sm text-gray-600">
        <p>
          <strong>Learning Profile:</strong> 
        </p>
        <p className="mt-1">Liked Types → {JSON.stringify(userProfile.likedTypes)}</p>
        <p>Liked Relations → {JSON.stringify(userProfile.likedRelations)}</p>
      </div>

      {ranked.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800">{post.author}</div>
              <p className="text-xs text-gray-400">
                {post.relation === 'closeFriend'
                  ? '👫 Close Friend'
                  : post.relation === 'friend'
                  ? '👋 Friend'
                  : '📄 Page'}
              </p>
            </div>
            <div className="text-sm text-gray-400">Score: {post.score}</div>
          </div>

          <p className="text-gray-700 mt-2">{post.content}</p>

          <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
            <div>
              ❤️ {post.likes} • 💬 {post.comments}
            </div>
            <button
              onClick={() => handleLike(post)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
            >
              Like 👍
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
