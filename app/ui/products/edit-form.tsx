// app/ui/products/edit-form.tsx
'use client';

import { updateProduct } from '@/app/lib/product-actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id_produk: number;
  nama_produk: string;
  harga: number;
  stok: number;
  deskripsi: string | null;
  foto: string | null;
}

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Gunakan foto yang sudah ada
      if (product.foto) {
        formData.set('foto', product.foto);
      }
      
      const result = await updateProduct(product.id_produk, formData);
      
      if (result.success) {
        router.push('/dashboard/products');
        router.refresh();
      } else {
        alert('Gagal mengupdate produk: ' + result.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Gagal mengupdate produk. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="nama_produk" className="block text-sm font-medium text-gray-700">
            Nama Produk
          </label>
          <input
            type="text"
            id="nama_produk"
            name="nama_produk"
            defaultValue={product.nama_produk}
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
            defaultValue={product.harga}
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
            defaultValue={product.stok}
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
            defaultValue={product.deskripsi || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
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
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
