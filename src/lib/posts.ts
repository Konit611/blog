import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  id: string; // Will now include category path, e.g., "category/post-name"
  title: string;
  date: string;
  excerpt?: string;
  contentHtml?: string;
  category?: string; // Optional: Extract category from path
  genre?: string; // Add genre field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Helper function to recursively get all markdown file paths relative to postsDirectory
function getAllMarkdownFiles(dirPath: string, relativePath = ''): string[] {
  let files: string[] = [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const currentPath = path.join(dirPath, entry.name);
      const currentRelativePath = path.join(relativePath, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getAllMarkdownFiles(currentPath, currentRelativePath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(currentRelativePath);
      }
    }
  } catch (err) {
    // Only log warning if it's the root postsDirectory that's missing
    if (dirPath === postsDirectory) {
       console.warn(`Could not read posts directory: ${postsDirectory}. Returning empty array.`);
    } else {
       console.error(`Error reading directory ${dirPath}:`, err);
    }
  }
  return files;
}


export function getSortedPostsData(): PostData[] {
  const relativeFilePaths = getAllMarkdownFiles(postsDirectory);

  const allPostsData = relativeFilePaths.map((relativeFilePath) => {
    // id becomes the relative path without .md extension (e.g., "category/post-name")
    const id = relativeFilePath.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, relativeFilePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Extract category from path if it exists
    const pathParts = id.split(path.sep);
    const category = pathParts.length > 1 ? pathParts[0] : undefined;

    return {
      id,
      category, // Add category field
      title: matterResult.data.title || 'Untitled Post',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      excerpt: matterResult.data.excerpt || '',
      genre: matterResult.data.genre || undefined, // Extract genre
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const relativeFilePaths = getAllMarkdownFiles(postsDirectory);

  return relativeFilePaths.map((relativeFilePath) => {
    const slugParts = relativeFilePath.replace(/\.md$/, '').split(path.sep);
    return {
      params: {
        // slug is now an array of path segments
        slug: slugParts,
      },
    };
  });
}

export async function getPostData(slugArray: string[]): Promise<PostData> {
  // Join the slug array back into a relative path
  const id = slugArray.join(path.sep);
  const relativePath = `${id}.md`;
  const fullPath = path.join(postsDirectory, relativePath);
  let fileContents = '';

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch {
    console.error(`Could not read post file: ${fullPath}`);
    // Return a default structure or throw a more specific error
    // Note: The notFound() function in the page component will handle the 404
    return { id, title: 'Post not found', date: '', contentHtml: '<p>This post could not be loaded.</p>' };
  }

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const pathParts = id.split(path.sep);
  const category = pathParts.length > 1 ? pathParts[0] : undefined;

  return {
    id,
    contentHtml,
    category,
    title: matterResult.data.title || 'Untitled Post',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    genre: matterResult.data.genre || undefined, // Extract genre
    ...matterResult.data,
  };
}
