'use client';

import { useState, useTransition } from 'react';
import { updateTransaction, deleteTransaction } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

interface Customer {
  id_customer: string;
  name: string;
}

interface Product {
  id_produk: string;
  nama_produk: string;
}

interface Transaction {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'paid';
}

export default function EditTransactionForm({
  transaction,
  customers,
  products,
}: {
  transaction: Transaction;
  customers: Customer[];
  products: Product[];
}) {
  const [formData, setFormData] = useState({
    customerId: transaction.customerId,
    productId: transaction.productId,
    quantity: transaction.quantity,
    status: transaction.status,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append('customerId', formData.customerId);
    form.append('productId', formData.productId);
    form.append('quantity', formData.quantity.toString());
    form.append('status', formData.status);

    startTransition(() => {
      updateTransaction(transaction.id, form);
    });
  };

  const handleDelete = () => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      startTransition(() => {
        deleteTransaction(transaction.id);
        router.push('/dashboard/invoices');
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-md shadow"
    >
      <div>
        <label htmlFor="customerId" className="block font-medium">
          Customer
        </label>
        <select
          name="customerId"
          onChange={handleChange}
          value={formData.customerId}
          required
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Pilih Customer</option>
          {customers.map((cust) => (
            <option key={cust.id_customer} value={cust.id_customer}>
              {cust.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="productId" className="block font-medium">
          Product
        </label>
        <select
          name="productId"
          onChange={handleChange}
          value={formData.productId}
          required
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Pilih Produk</option>
          {products.map((prod) => (
            <option key={prod.id_produk} value={prod.id_produk}>
              {prod.nama_produk}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block font-medium">
          Jumlah
        </label>
        <input
          type="number"
          name="quantity"
          min={1}
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="status" className="block font-medium">
          Status Transaksi
        </label>
        <select
          name="status"
          onChange={handleChange}
          value={formData.status}
          required
          className="mt-1 w-full border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-600 hover:underline"
          disabled={isPending}
        >
          Hapus
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isPending}
        >
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
