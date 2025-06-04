'use client';

import { useState, useTransition } from 'react';
import { createTransaction } from '@/app/lib/actions';

interface Customer {
  id_customer: string;
  name: string;
}

interface Product {
  id_produk: string;
  nama_produk: string;
}

export default function CreateTransactionForm({
  customers,
  products,
}: {
  customers: Customer[];
  products: Product[];
}) {
  const [formData, setFormData] = useState({
    customerId: '',
    productId: '',
    quantity: 1,
  });

  const [isPending, startTransition] = useTransition();

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

    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(() => {
      createTransaction(data);
    });
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
          {customers.map((cust, index) => (
            <option
              key={`cust-${cust.id_customer ?? index}`}
              value={cust.id_customer}
            >
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
          {products.map((prod, index) => (
            <option
              key={`prod-${prod.id_produk ?? index}`}
              value={prod.id_produk}
            >
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'Menyimpan...' : 'Simpan Transaksi'}
      </button>
    </form>
  );
}
