// This is now a Server Component - no "use client" needed
import { getSortedPostsData, PostData } from '@/lib/posts'; // Assuming @ is configured for src path alias
import BlogList from '@/components/BlogList'; // Import the new client component

export default function Blog() {
  // Fetch data on the server
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* Render the client component, passing the fetched data */}
      <BlogList posts={allPostsData} />
    </section>
  );
}
