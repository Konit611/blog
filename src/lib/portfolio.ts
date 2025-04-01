import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// Removed unused remark and html imports

// Define the path to the portfolio directory relative to the project root
const portfolioDirectory = path.join(process.cwd(), 'src/content/portfolio');

export interface PortfolioItemData {
  id: string;
  title: string;
  date: string;
  tech?: string[]; // Optional array of technologies used
  image?: string; // Optional path to a representative image
  excerpt?: string; // Optional short description
  contentHtml?: string; // Optional full content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow other front matter fields
}

export function getSortedPortfolioData(): PortfolioItemData[] {
  // Get file names under /src/content/portfolio
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(portfolioDirectory);
  } catch { // Removed unused _err variable
    console.warn(`Could not read portfolio directory: ${portfolioDirectory}. Returning empty array.`);
    return [];
  }

  const allPortfolioData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(portfolioDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || 'Untitled Project',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        excerpt: matterResult.data.excerpt || '',
        ...matterResult.data, // Include tech, image, etc.
      };
    });

  // Sort portfolio items by date (newest first)
  return allPortfolioData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// If you need individual portfolio pages later, you can add functions like
// getAllPortfolioIds and getPortfolioItemData, similar to the posts library.
// For now, we'll just list them.
