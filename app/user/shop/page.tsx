import ImageSlider from "@/app/ui/user/ImageSlider";
import CategoryCarousel from "@/app/ui/user/KategoriCarousel";
import ProductCard from "@/app/ui/user/produkCard";
import { fetchProducts } from "@/app/lib/prisma";
import { ProductGridSkeleton } from "@/app/ui/products/skeletons";
import { Suspense } from "react";
import Pagination from "@/app/ui/products/pagination";

// Set items per page to 5
const ITEMS_PER_PAGE = 5;

// Helper function to get proper image URL
function getImageUrl(foto: string | null): string {
  if (!foto) return '/Pulpen.png';
  
  if (foto.startsWith('/') || foto.startsWith('http')) {
    return foto;
  }
  
  // If it's just a filename, add a leading slash
  return `/uploads/${foto}`;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { products, totalPages } = await fetchProducts(currentPage, ITEMS_PER_PAGE);
  
  return (
    <>
      <div className="flex flex-col items-center">
        <ImageSlider />
        <h1 className="text-3xl font-bold mt-8">Kategori</h1>
        <CategoryCarousel />
        <h1 className="text-3xl font-bold mt-8">Produk</h1>
        
        <Suspense fallback={<ProductGridSkeleton />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products && products.length > 0 ? (
              products.map((product) => {
                return (
                  <ProductCard
                    key={product.id_produk}
                    title={product.nama_produk}
                    image={getImageUrl(product.foto)}
                    rating={4.5} // Default rating
                    reviewCount={10} // Default review count
                    priceOriginal={product.harga * 1.2} // Harga asli (20% lebih tinggi)
                    priceDiscount={product.harga}
                    productId={parseInt(product.id_produk)}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Tidak ada produk yang tersedia saat ini.</p>
              </div>
            )}
          </div>
        </Suspense>
        
        {/* Pagination */}
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} />}
      </div>
    </>
  );
}