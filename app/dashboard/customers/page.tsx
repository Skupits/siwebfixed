import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import CustomersTableSkeleton from '@/app/ui/dashboard/customers-skeletons';
import { fetchCustomers } from '@/app/lib/prisma';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable />
      </Suspense>
    </div>
  );
}

async function CustomersTable() {
  const customers = await fetchCustomers();
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Orders
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id_customer} className="w-full border-b py-3 text-sm last-of-type:border-none">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/default-user.png"
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${customer.name}'s profile picture`}
                        />
                        <p>{customer.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      customer@example.com
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      3
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      Rp 300.000
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}