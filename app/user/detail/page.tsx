'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/app/lib/utils';

interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
  stok: number;
  foto: string | null;
  deskripsi: string | null;
}

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      try {
        if (!productId) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stok || 1)) {
      setQuantity(newQuantity);
    }
  };

  // Function to get proper image URL
  const getImageUrl = (foto: string | null): string => {
    if (!foto) return '/Pulpen.png';
    
    if (foto.startsWith('/') || foto.startsWith('http')) {
      return foto;
    }
    
    // If it's just a filename, add a leading slash
    return `/uploads/${foto}`;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 w-1/3 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h2>
          <p className="text-gray-600">Produk yang Anda cari tidak tersedia atau telah dihapus.</p>
          <a href="/user/shop" className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Kembali ke Toko
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Image 
              src={imgError ? "/Pulpen.png" : getImageUrl(product.foto)} 
              alt={product.nama_produk}
              fill
              className="object-contain p-4"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.nama_produk}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400" />
            </div>
            <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 line-through">{formatCurrency(product.harga * 1.2)}</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(product.harga)}</p>
            <p className="text-sm text-green-600 mt-1">Stok: {product.stok} tersedia</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
            <p className="text-gray-600">{product.deskripsi || 'Tidak ada deskripsi produk.'}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Jumlah</h3>
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stok}
                className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition">
            <ShoppingCart className="w-5 h-5" />
            <span>Tambahkan ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
}