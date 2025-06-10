// app/dashboard/products/page.tsx
import { fetchProducts } from '@/app/lib/product-actions';
import { deleteProduct } from './actions';
import { formatCurrency } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ProductImage from '@/app/ui/products/product-image';
import ProductSearch from '@/app/ui/products/search';

export default async function ProductsPage({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const products = await fetchProducts();

  const filteredProducts = query
    ? products.filter(product =>
        product.nama_produk.toLowerCase().includes(query.toLowerCase()) ||
        (product.deskripsi && product.deskripsi.toLowerCase().includes(query.toLowerCase()))
      )
    : products;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Produk</h1>
        <Link
          href="/dashboard/products/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>Tambah Produk</span>
        </Link>
      </div>

      {/* Search */}
      <div className="mt-4 mb-4">
        <ProductSearch defaultQuery={query} />
      </div>

      {/* Tabel produk */}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-5 text-left text-sm font-medium text-gray-500">Produk</th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-gray-500">Harga</th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-gray-500">Stok</th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-gray-500">Deskripsi</th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-gray-500">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const imageSrc = product.foto
                        ? product.foto.startsWith('product_')
                          ? `/uploads/${product.foto}`
                          : `/${product.foto}`
                        : '/Pulpen.png';

                      return (
                        <tr key={product.id_produk} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 relative">
                                <ProductImage src={imageSrc} alt={product.nama_produk} />
                              </div>
                              <p>{product.nama_produk}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {formatCurrency(Number(product.harga))}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">{product.stok}</td>
                          <td className="px-4 py-4 max-w-xs">
                            <p className="truncate">{product.deskripsi || '-'}</p>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/dashboard/products/${product.id_produk}/edit`}
                                className="rounded-md border p-2 hover:bg-gray-100"
                              >
                                <PencilIcon className="w-5" />
                              </Link>
                              <form action={async () => {
                                'use server';
                                await deleteProduct(product.id_produk);
                              }}>
                                <button className="rounded-md border p-2 hover:bg-gray-100">
                                  <TrashIcon className="w-5" />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500">
                        Tidak ada produk yang ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
