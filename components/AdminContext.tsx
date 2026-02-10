import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setAdminAuth: (authenticated: boolean) => void;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin auth on mount
    const auth = sessionStorage.getItem('admin_auth');
    setIsAdmin(auth === 'true');
  }, []);

  const setAdminAuth = (authenticated: boolean) => {
    setIsAdmin(authenticated);
    if (authenticated) {
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      sessionStorage.removeItem('admin_auth');
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setAdminAuth, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
