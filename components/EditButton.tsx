import React from 'react';
import { useAdmin } from './AdminContext';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, label = 'Edit Page' }) => {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-600 text-slate-950 px-6 py-3 rounded-full font-bold shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
      title={label}
    >
      <i className="fas fa-edit"></i>
      <span>{label}</span>
    </button>
  );
};

export default EditButton;
