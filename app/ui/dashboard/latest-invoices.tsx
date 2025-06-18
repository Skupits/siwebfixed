import { ArrowPathIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default async function LatestInvoices({
  latestInvoices = [],
}: {
  latestInvoices?: LatestInvoice[];
}) {
  // Dummy data untuk contoh
  const dummyInvoices = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      amount: 'Rp 450.000',
      status: 'paid',
      date: '2 jam lalu',
      image_url: '/customers/amy-burns.png'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 'Rp 275.000',
      status: 'pending',
      date: '5 jam lalu',
      image_url: '/customers/balazs-orban.png'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      amount: 'Rp 320.000',
      status: 'paid',
      date: '1 hari lalu',
      image_url: '/customers/delba-de-oliveira.png'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@example.com',
      amount: 'Rp 180.000',
      status: 'paid',
      date: '2 hari lalu',
      image_url: '/customers/lee-robinson.png'
    }
  ];

  // Use latestInvoices if provided, otherwise use dummy data
  const invoices = latestInvoices.length > 0 ? latestInvoices : dummyInvoices;

  return (
    <div className="col-span-8 lg:col-span-3 h-96 rounded-xl bg-white p-6 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Transaksi Terbaru</h2>
        <div className="flex items-center text-sm text-green-600 font-medium">
          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
          <span>+12.5%</span>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100%-4rem)] pr-2 scrollbar-thin">
        {invoices.map((invoice, i) => (
          <div
            key={invoice.id}
            className={clsx(
              'flex flex-row items-center justify-between py-4',
              {
                'border-t border-gray-100': i !== 0,
              },
            )}
          >
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${invoice.status === 'paid' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-800">
                  {invoice.name}
                </p>
                <p className="text-xs text-gray-500">
                  {invoice.date}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800">
              {invoice.amount}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-4 mt-2 border-t border-gray-100">
        <ArrowPathIcon className="h-4 w-4 text-gray-500" />
        <span className="ml-2 text-xs text-gray-500">Diperbarui baru saja</span>
      </div>
    </div>
  );
}