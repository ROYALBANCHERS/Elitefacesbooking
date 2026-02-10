import React, { useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string, base64: string) => void;
  currentImage?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage, label = 'Upload Image' }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelect(file.name, base64);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-sm text-slate-400 block">{label}</label>}

      {/* Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-white/10"
          />
          <button
            onClick={() => { setPreview(''); onImageSelect('', ''); }}
            className="absolute top-2 right-2 bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center space-x-2 w-full py-3 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            uploading
              ? 'border-slate-600 bg-slate-800/50 text-slate-500 cursor-not-allowed'
              : 'border-white/20 bg-slate-900/50 hover:border-yellow-500/50 hover:bg-slate-800/50 text-slate-300'
          }`}
        >
          {uploading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <i className="fas fa-cloud-upload-alt"></i>
              <span>{preview ? 'Change Image' : 'Upload from Device'}</span>
            </>
          )}
        </label>
      </div>

      {/* Help Text */}
      <p className="text-xs text-slate-500">
        <i className="fas fa-info-circle mr-1"></i>
        Max file size: 5MB. Supported: JPG, PNG, GIF, WebP
      </p>
    </div>
  );
};

export default ImageUpload;
