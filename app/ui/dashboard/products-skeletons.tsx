// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ProductTableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none">
      {/* Product Name and Image */}
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Price */}
      <td className="whitespace-nowrap px-4 py-4">
        <div className="h-6 w-20 rounded bg-gray-100"></div>
      </td>
      {/* Stock */}
      <td className="whitespace-nowrap px-4 py-4">
        <div className="h-6 w-12 rounded bg-gray-100"></div>
      </td>
      {/* Description */}
      <td className="px-4 py-4 max-w-xs">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-gray-100"></div>
          <div className="h-9 w-9 rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export default function ProductsTableSkeleton() {
  return (
    <div className={`${shimmer} relative mt-6 flow-root`}>
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
                <ProductTableRowSkeleton />
                <ProductTableRowSkeleton />
                <ProductTableRowSkeleton />
                <ProductTableRowSkeleton />
                <ProductTableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}