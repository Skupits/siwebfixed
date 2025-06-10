import { lusitana } from '@/app/ui/fonts';
import EditProductForm from '@/app/ui/products/edit-form';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchProductById } from '@/app/lib/product-actions';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Destructuring untuk menghindari error sync-dynamic-apis
  const { id: productIdString } = params;
  const id = Number(productIdString);
  
  if (isNaN(id)) {
    return notFound();
  }
  
  const productData = await fetchProductById(id);
  
  if (!productData) {
    return notFound();
  }
  
  const product = {
    ...productData,
    harga: Number(productData.harga),
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl`}>Edit Produk</h1>
        <Link
          href="/dashboard/products"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Kembali ke Daftar Produk
        </Link>
      </div>
      
      <EditProductForm product={product} />
    </div>
  );
}
