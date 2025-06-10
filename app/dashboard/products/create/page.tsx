import { lusitana } from '@/app/ui/fonts';
import CreateProductForm from '@/app/ui/products/create-form';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateProductPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl`}>Tambah Produk Baru</h1>
        <Link
          href="/dashboard/products"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Kembali ke Daftar Produk
        </Link>
      </div>
      
      <CreateProductForm />
    </div>
  );
}