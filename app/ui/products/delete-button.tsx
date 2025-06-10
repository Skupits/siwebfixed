'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { deleteProduct } from '@/app/lib/product-actions';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setIsDeleting(true);
      try {
        const result = await deleteProduct(id);
        
        if (result.success) {
          router.refresh();
        } else {
          alert('Gagal menghapus produk: ' + result.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus produk');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-md border p-2 hover:bg-gray-100 disabled:opacity-50"
    >
      <TrashIcon className="w-5" />
    </button>
  );
}