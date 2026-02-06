import React, { useState } from 'react';

export type Page = 'home' | 'privacy' | 'services' | 'blog-industry' | 'blog-faq' | 'blog-success' | 'blog-event' | 'about' | 'why-us' | 'faqs' | 'contact' | 'portfolio';

interface RouterContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
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

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo: setCurrentPage }}>
      {children}
    </RouterContext.Provider>
  );
};
