import { deleteTransaction } from '@/app/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Ambil ID dari URL

    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan di URL' }, { status: 400 });
    }

    await deleteTransaction(id);

    return NextResponse.json({ message: 'Transaksi berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { message: 'Gagal menghapus transaksi' },
      { status: 500 }
    );
  }
}
