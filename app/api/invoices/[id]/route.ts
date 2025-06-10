import { deleteTransaction } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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