import CreateTransactionForm from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchProducts } from '@/app/lib/prisma';

export default async function Page() {
  const customers = await fetchCustomers();
  const { products } = await fetchProducts();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/invoices' },
          {
            label: 'Create Transaction',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <div className="mt-4">
        <CreateTransactionForm customers={customers} products={products} />
      </div>
    </main>
  );
}