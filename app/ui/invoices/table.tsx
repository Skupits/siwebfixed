

import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchTransactionTable } from '@/app/lib/prisma';

export default async function TransactionTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await fetchTransactionTable(query, currentPage);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {transactions.map((transaction) => (
              <div
                key={transaction.id_transaksi}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={transaction.image_url || '/default-user.png'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${transaction.nama_pembeli}'s profile picture`}
                      />
                      <p>{transaction.nama_pembeli}</p>
                    </div>
                    <p className="text-sm text-gray-500">{transaction.nama_produk}</p>
                  </div>
                  <InvoiceStatus status={transaction.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(Number(transaction.total_harga))}
                    </p>
                    <p>{formatDateToLocal(transaction.tanggal)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={transaction.id_transaksi.toString()} />
                    <DeleteInvoice id={transaction.id_transaksi.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Customer</th>
                <th className="px-3 py-5 font-medium">Product</th>
                <th className="px-3 py-5 font-medium">Total Harga</th>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-3 py-5 font-medium">Status</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id_transaksi}
                  className="border-b text-sm"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaction.image_url || '/default-user.png'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${transaction.nama_pembeli}'s profile picture`}
                      />
                      <p>{transaction.nama_pembeli}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{transaction.nama_produk}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(Number(transaction.total_harga))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(transaction.tanggal)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={transaction.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={transaction.id_transaksi.toString()} />
                      <DeleteInvoice id={transaction.id_transaksi.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
