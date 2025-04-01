import { getPostData, getAllPostIds, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PostProps {
  params: {
    // Slug is now an array of path segments
    slug: string[];
  };
}

// Generate static paths for all posts at build time
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // The paths returned by getAllPostIds are already in the format { params: { slug: '...' } }
  return paths;
}

// Fetch data for a specific post using the slug array
async function getData(slug: string[]): Promise<PostData> {
  const postData = await getPostData(slug);
  if (!postData || postData.title === 'Post not found') {
    notFound(); // Trigger 404 if post doesn't exist
  }
  return postData;
}

// Destructure slug directly from params
export default async function Post({ params: { slug } }: PostProps) {
  const postData = await getData(slug);

  return (
    <article className="container mx-auto px-4 py-8 prose dark:prose-invert lg:prose-xl">
      <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
    </article>
  );
}

// Optional: Add metadata generation
// Destructure slug directly from params
export async function generateMetadata({ params: { slug } }: PostProps) {
  try {
    const postData = await getPostData(slug);
    return {
      title: postData.title,
      description: postData.excerpt || 'Blog post', // Use excerpt if available
    };
  } catch (error) {
    // Handle cases where post might not be found during metadata generation
    console.error(`Error generating metadata for slug ${slug}:`, error);
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }
}
