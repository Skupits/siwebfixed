export const dynamic = 'force-dynamic';

import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchProducts, fetchTransactionById } from '@/app/lib/prisma';
import EditTransactionForm from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const customers = await fetchCustomers();
    const { products } = await fetchProducts();
    const transaction = await fetchTransactionById(id);

    if (!transaction) {
      notFound();
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Transactions', href: '/dashboard/invoices' },
            { label: 'Edit Transaction', href: `/dashboard/invoices/${id}/edit`, active: true },
          ]}
        />
        <div className="mt-4">
          <EditTransactionForm
            transaction={{
              id: transaction.id_transaksi,
              customerId: transaction.id_customers,
              productId: transaction.id_produk,
              quantity: transaction.quantity,
              status: transaction.status,
            }}
            customers={customers}
            products={products}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading transaction:', error);
    return <div className="p-4">Error: Tidak dapat memuat data transaksi.</div>;
  }
}

export async function generateStaticParams() {
  return [];
}