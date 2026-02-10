import React, { useState, useCallback, useMemo } from 'react';

export type Page = 'home' | 'privacy' | 'services' | 'blog-industry' | 'blog-faq' | 'blog-success' | 'blog-event' | 'about' | 'why-us' | 'faqs' | 'contact' | 'portfolio' | 'article-detail';

interface Article {
  id?: string;
  title?: string;
  content?: string;
  [key: string]: any;
}

interface RouterContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
}

export const RouterContext = React.createContext<RouterContextType | undefined>(undefined);

export const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArticle, setSelectedArticleState] = useState<Article | null>(null);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setSelectedArticle = useCallback((article: Article | null) => {
    setSelectedArticleState(article);
  }, []);

  const contextValue = useMemo(() => ({
    currentPage,
    navigateTo,
    selectedArticle,
    setSelectedArticle
  }), [currentPage, navigateTo, selectedArticle, setSelectedArticle]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};
