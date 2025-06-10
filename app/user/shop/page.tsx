import ImageSlider from "@/app/ui/user/ImageSlider";
import CategoryCarousel from "@/app/ui/user/KategoriCarousel";
import ProductCard from "@/app/ui/user/produkCard";
import { fetchProducts } from "@/app/lib/product-actions";

export default async function ShopPage() {
  const products = await fetchProducts();
  
  return (
    <>
      <div className="flex flex-col items-center">
        <ImageSlider />
        <h1 className="text-3xl font-bold mt-8">Kategori</h1>
        <CategoryCarousel />
        <h1 className="text-3xl font-bold mt-8">Produk</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => {
            // Tentukan sumber gambar
            const imageSrc = product.foto 
              ? product.foto.startsWith('product_') 
                ? `/uploads/${product.foto}` 
                : `/${product.foto}`
              : '/Pulpen.png';
              
            return (
              <ProductCard
                key={product.id_produk}
                title={product.nama_produk}
                image={imageSrc}
                rating={4.5} // Default rating
                reviewCount={10} // Default review count
                priceOriginal={Number(product.harga) * 1.2} // Harga asli (20% lebih tinggi)
                priceDiscount={Number(product.harga)}
                productId={product.id_produk}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}