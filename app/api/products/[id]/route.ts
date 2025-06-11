import { deleteProduct, fetchProductById } from '@/app/lib/product-actions';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.pathname.split('/').pop();
    const id = idParam ? parseInt(idParam) : NaN;

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
    }

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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.pathname.split('/').pop();
    const id = idParam ? parseInt(idParam) : NaN;

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
    }

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
