'use client';

import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface UploadButtonProps {
  onImageUploaded: (imagePath: string) => void;
}

export default function UploadButton({ onImageUploaded }: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload gagal');
      }

      const data = await response.json();
      onImageUploaded(data.fileName);
    } catch (err) {
      console.error('Error uploading:', err);
      setError('Gagal upload gambar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {isUploading ? 'Uploading...' : 'Upload Gambar'}
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}