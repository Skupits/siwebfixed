// app/api/products/[id]/route.ts
import { deleteProduct, fetchProductById } from '@/app/lib/product-actions';
import { NextResponse } from 'next/server';

// Tambahkan ini jika route dinamis (agar tidak error di Vercel)
export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  try {
    await deleteProduct(id);
    return NextResponse.json({ message: 'Produk berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  try {
    const product = await fetchProductById(id);

    if (!product) {
      return NextResponse.json(
        { message: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}
