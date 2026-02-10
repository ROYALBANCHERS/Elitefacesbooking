import React, { useEffect, useState } from 'react';
import { useRouter } from './Router';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  section: string;
  imageUrl: string;
  date: string;
  author?: string;
  published: boolean;
  slug?: string;
}

const BlogListingPage: React.FC<{ section?: string }> = ({ section }) => {
  const { navigateTo } = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem('elitefaces_blogs');
    if (savedBlogs) {
      const allBlogs: BlogPost[] = JSON.parse(savedBlogs);
      // Only show published blogs
      const publishedBlogs = allBlogs.filter(b => b.published !== false);
      setBlogs(publishedBlogs);

      if (section) {
        const sectionBlogs = publishedBlogs.filter(b => b.section === section);
        setFilteredBlogs(sectionBlogs);
      } else {
        setFilteredBlogs(publishedBlogs);
      }
    }
    setLoading(false);
  }, [section]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredBlogs(blogs.filter(b => section ? b.section === section : true));
    } else {
      setFilteredBlogs(blogs.filter(b => b.category === selectedCategory && (section ? b.section === section : true)));
    }
  }, [selectedCategory, blogs, section]);

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const truncateContent = (content: string, maxLength: number = 150) => {
    // Strip HTML tags
    const temp = document.createElement('div');
    temp.innerHTML = content;
    const text = temp.textContent || temp.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleBlogClick = (blog: BlogPost) => {
    // Store selected blog for detail view
    localStorage.setItem('elitefaces_selected_blog', JSON.stringify(blog));
    navigateTo('blog-detail', blog.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-yellow-500 text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('home')}
          className="text-yellow-500 hover:text-yellow-400 mb-8 flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gold-gradient">
            {section ? `${section} Articles` : 'Blog & Articles'}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest news, trends, and insights from the celebrity and entertainment industry.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article
                key={blog.id}
                className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.imageUrl || '/LOGO.PNG'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-500 text-xs uppercase tracking-widest">
                      {blog.category}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-white line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {blog.excerpt || truncateContent(blog.content)}
                  </p>
                  <button
                    onClick={() => handleBlogClick(blog)}
                    className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors text-sm"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-3xl border-dashed border-2 border-white/5">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No Articles Found</h3>
            <p className="text-slate-500">Check back later for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;
