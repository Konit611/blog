import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Blog & Portfolio</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-10">
        Explore my latest thoughts, projects, and experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg">
          Read the Blog
        </Link>
        <Link href="/portfolio" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg">
          View Portfolio
        </Link>
        <Link href="/about" className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-lg">
          About Me
        </Link>
      </div>
    </main>
  );
}
