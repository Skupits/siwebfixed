'use client';

import { createProduct } from '@/app/lib/product-actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadButton from './upload-button';
import Image from 'next/image';

export default function CreateProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageUploaded = (fileName: string) => {
    setImageName(fileName);
    setImagePreview(`/uploads/${fileName}`);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Tambahkan nama file gambar jika ada
      if (imageName) {
        formData.set('foto', imageName);
      } else {
        formData.set('foto', 'Pulpen.png');
      }
      
      const result = await createProduct(formData);
      
      if (result.success) {
        router.push('/dashboard/products');
        router.refresh();
      } else {
        setError(result.error || 'Gagal menambahkan produk');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Gagal menambahkan produk. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="nama_produk" className="block text-sm font-medium text-gray-700">
            Nama Produk
          </label>
          <input
            type="text"
            id="nama_produk"
            name="nama_produk"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
            Harga (Rp)
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            min="0"
            step="1000"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="stok" className="block text-sm font-medium text-gray-700">
            Stok
          </label>
          <input
            type="number"
            id="stok"
            name="stok"
            min="0"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Produk
          </label>
          <div className="flex items-center space-x-4">
            <UploadButton onImageUploaded={handleImageUploaded} />
            {imagePreview && (
              <div className="h-20 w-20 relative border rounded-md overflow-hidden">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                  onError={() => setImagePreview('/Pulpen.png')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </div>
    </form>
  );
}