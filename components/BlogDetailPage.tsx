import React, { useEffect, useState } from 'react';
import { useRouter } from './Router';
import { BlogPost } from './BlogListingPage';

const BlogDetailPage: React.FC<{ blogId?: string }> = ({ blogId }) => {
  const { navigateTo } = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = () => {
      // Try to get from localStorage first (selected blog)
      const selectedBlog = localStorage.getItem('elitefaces_selected_blog');
      if (selectedBlog) {
        setBlog(JSON.parse(selectedBlog));
        localStorage.removeItem('elitefaces_selected_blog');
        setLoading(false);
        return;
      }

      // If not found, search in all blogs
      const savedBlogs = localStorage.getItem('elitefaces_blogs');
      if (savedBlogs) {
        const blogs: BlogPost[] = JSON.parse(savedBlogs);
        const foundBlog = blogs.find(b => b.id === blogId || b.slug === blogId);
        if (foundBlog) {
          setBlog(foundBlog);
        }
      }
      setLoading(false);
    };

    loadBlog();
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} - Elite Faces Booking`;
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-yellow-500 text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigateTo('home')}
            className="btn-gold text-slate-950 px-6 py-3 rounded-lg font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article>
        {/* Hero Image */}
        {blog.imageUrl && (
          <div className="relative h-64 md:h-96 w-full mb-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-8 flex items-center space-x-2"
          >
            <span>←</span> <span>Back to Home</span>
          </button>

          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-yellow-500 text-sm uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              {blog.section && (
                <span className="text-slate-400 text-sm">
                  in {blog.section}
                </span>
              )}
              <span className="text-slate-500 text-sm">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gold-gradient">
              {blog.title}
            </h1>

            {/* Author */}
            {blog.author && (
              <div className="flex items-center mb-8 pb-8 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                  <span className="text-yellow-500 font-bold">{blog.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{blog.author}</p>
                  <p className="text-slate-500 text-sm">Author</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-yellow-500 transition-colors"
                >
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-yellow-500 transition-colors"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-green-500 transition-colors"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
