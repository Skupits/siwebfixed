'use client';

import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface UploadImageProps {
  onImageUploaded: (imagePath: string) => void;
  defaultImage?: string;
}

export default function UploadImage({ onImageUploaded, defaultImage }: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.includes('image/')) {
      setError('File harus berupa gambar');
      return;
    }

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran file maksimal 2MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Tampilkan preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal mengupload gambar');
      }

      const data = await response.json();
      onImageUploaded(data.fileName);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Gagal mengupload gambar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            isUploading ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <CloudArrowUpIcon className="w-8 h-8" />
              <span className="text-xs mt-1">Upload Gambar</span>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>

        <div>
          <p className="text-sm text-gray-500">
            Format: JPG, PNG, GIF
            <br />
            Ukuran maksimal: 2MB
          </p>
          {isUploading && (
            <p className="text-sm text-blue-500 mt-1">Mengupload...</p>
          )}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}