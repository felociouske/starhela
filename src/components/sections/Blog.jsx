const posts = [
  {
    id: 1,
    category: "Earnings",
    title: "How to Maximize Your Daily Earnings on Starhela",
    excerpt:
      "Learn the proven strategies our top earners use to consistently hit the maximum daily income from chatting alone.",
    date: "April 12, 2025",
    readTime: "4 min read",
    accent: "#6C3FC5",
  },
  {
    id: 2,
    category: "Forex",
    title: "Getting Started with Forex Trading Bots in 2025",
    excerpt:
      "Our automated forex bots are now smarter than ever. Here is a beginner guide to setting up your first bot and understanding the signals.",
    date: "April 8, 2025",
    readTime: "6 min read",
    accent: "#F59E0B",
  },
  {
    id: 3,
    category: "Betting",
    title: "Understanding Our Smart Betting Tip System",
    excerpt:
      "We break down how our expert analysts generate daily betting picks and why our win rate continues to grow every month.",
    date: "April 3, 2025",
    readTime: "5 min read",
    accent: "#3B82F6",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            From the Blog
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
            Tips, guides, and updates to help you earn more and get the most
            out of every Starhela service.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#2DD4AA] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Color Banner */}
              <div
                className="w-full h-2"
                style={{ backgroundColor: post.accent }}
              />

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                    style={{
                      color: post.accent,
                      backgroundColor: `${post.accent}12`,
                      borderColor: `${post.accent}30`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-text-muted text-xs">{post.readTime}</span>
                </div>

                <h3 className="text-text-primary font-semibold text-base leading-snug">
                  {post.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-text-muted text-xs">{post.date}</span>
                  <button
                    className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                    style={{ color: post.accent }}
                  >
                    Read more
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}