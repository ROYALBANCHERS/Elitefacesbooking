import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

interface PageEditorProps {
  pageId: string;
  defaultContent: string;
  onContentChange?: (content: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ pageId, defaultContent, onContentChange }) => {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [editContent, setEditContent] = useState(defaultContent);

  useEffect(() => {
    // Load content from localStorage
    const stored = localStorage.getItem(`page_content_${pageId}`);
    if (stored) {
      setContent(stored);
      setEditContent(stored);
      onContentChange?.(stored);
    }
  }, [pageId, onContentChange]);

  const handleSave = () => {
    setContent(editContent);
    localStorage.setItem(`page_content_${pageId}`, editContent);
    onContentChange?.(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCancel}></div>
        <div className="relative glass w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Edit Page Content</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium"
              >
                <i className="fas fa-save mr-2"></i>Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full bg-slate-900 text-white p-6 font-mono text-sm resize-none focus:outline-none"
              placeholder="Enter your page content here... You can use HTML tags."
            />
          </div>

          {/* Preview */}
          <div className="p-4 border-t border-white/10">
            <p className="text-sm text-slate-400 mb-2">Preview:</p>
            <div className="bg-white rounded-lg p-4 text-slate-900 max-h-40 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: editContent }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button
        onClick={() => setIsEditing(true)}
        className="fixed top-20 right-4 z-40 bg-yellow-500 hover:bg-yellow-600 text-slate-950 px-4 py-2 rounded-full font-bold shadow-lg flex items-center space-x-2 text-sm transition-all hover:scale-105"
        title="Edit this page"
      >
        <i className="fas fa-edit"></i>
        <span>Edit Page</span>
      </button>
    </>
  );
};

export default PageEditor;
