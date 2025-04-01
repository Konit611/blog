// Removed unused Image import
// Removed unused Link import
import { getSortedPortfolioData, PortfolioItemData } from '@/lib/portfolio';

export default function Portfolio() {
  const allPortfolioData: PortfolioItemData[] = getSortedPortfolioData();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
      {allPortfolioData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPortfolioData.map(({ id, title, date, excerpt, tech /* removed image */ }) => (
            <div key={id} className="border rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              {/* Removed Image component */}
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{date}</p>
                {excerpt && <p className="text-gray-700 dark:text-gray-300 mb-3">{excerpt}</p>}
                {tech && tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tech.map((t) => (
                      <span key={t} className="bg-gray-200 dark:bg-gray-700 text-xs font-semibold px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {/* Optional: Add a link to a detailed page if you implement it later */}
                {/* <Link href={`/portfolio/${id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                  View Details &rarr;
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No portfolio items found.</p>
      )}
    </section>
  );
}
