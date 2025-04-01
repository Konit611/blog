"use client"; // This component needs client-side interactivity

import Link from 'next/link';
import { useState } from 'react';
import { PostData } from '@/lib/posts'; // Assuming PostData interface is exported

interface BlogListProps {
  posts: PostData[];
}

const genres = ['All', 'Design', 'Mobile', 'Frontend', 'Backend', 'Infra', 'CS', 'Data Analysis'];

export default function BlogList({ posts }: BlogListProps) {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredPosts = selectedGenre === 'All'
    ? posts
    : posts.filter(post => post.genre === selectedGenre);

  return (
    <div>
      {/* Genre Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedGenre === genre
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Post List */}
      {filteredPosts.length > 0 ? (
        <ul className="space-y-6">
          {filteredPosts.map(({ id, date, title, excerpt, genre }) => (
            <li key={id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow dark:border-gray-700">
              {genre && (
                <span className="inline-block bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                  {genre}
                </span>
              )}
              <h2 className="text-2xl font-semibold mb-2 inline-block">
                <Link href={`/blog/${id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{date}</p>
              {excerpt && <p className="text-gray-700 dark:text-gray-300">{excerpt}</p>}
              <Link href={`/blog/${id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                Read more &rarr;
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts found for the selected genre.</p> // Updated message
      )}
    </div>
  );
}
