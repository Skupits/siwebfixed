import ImageSlider from "@/app/ui/user/ImageSlider";
import CategoryCarousel from "@/app/ui/user/KategoriCarousel";
import ProductCard from "@/app/ui/user/produkCard";
import { products } from "@/app/lib/placeholder-data";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <ImageSlider />
        <h1 className="text-3xl font-bold mt-8">Kategori</h1>
        <CategoryCarousel />
        <h1 className="text-3xl font-bold mt-8">Produk</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              priceOriginal={product.priceOriginal}
              priceDiscount={product.priceDiscount}
            />
          ))}
        </div>
      </div>
    </>
  );
}
