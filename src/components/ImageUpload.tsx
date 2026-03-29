'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  label?: string;
  defaultValue?: string;
}

export function ImageUpload({ onUploadSuccess, onUploadError, label = "Product Image", defaultValue }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
        onUploadError?.('Please upload an image file');
        return;
    }

    // Limit size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
        onUploadError?.('File size exceeds 5MB limit');
        return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreview(data.secure_url);
      onUploadSuccess(data.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#86967E] block">
        {label}
      </label>
      
      <div className="relative border-2 border-dashed border-[#363330] rounded-lg p-6 flex flex-col items-center justify-center bg-[#1C1917] hover:border-[#86967E] transition-all cursor-pointer group">
        {!preview ? (
          <>
            <div className="mb-4 text-[#8A8886] group-hover:text-[#F9F8F6] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <p className="text-[11px] font-sans text-stone-400">
              {uploading ? 'Uploading...' : 'Click to select or drag & drop'}
            </p>
          </>
        ) : (
          <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-md border border-[#363330]">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className="object-cover"
            />
            <button 
              onClick={(e) => { e.stopPropagation(); clearSelection(); }} 
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black transition-colors"
              title="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload} 
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept="image/*"
        />
      </div>
      
      {uploading && (
        <div className="w-full bg-[#363330] h-1 rounded-full overflow-hidden">
          <div className="bg-[#86967E] h-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
        </div>
      )}
    </div>
  );
}
