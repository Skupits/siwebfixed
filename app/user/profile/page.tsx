// app/user/profile/page.tsx
import { lusitana } from '@/app/ui/fonts';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function UserProfilePage() {
  // Data user (dalam aplikasi nyata, ini akan diambil dari database)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sudirman No. 123, Jakarta',
    joinDate: '10 Maret 2023',
    orders: 12,
    avatar: '/Pulpen.png', // Gunakan gambar default
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-6`}>Profil Saya</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={128} 
                height={128} 
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">Member sejak {user.joinDate}</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Telepon</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Alamat</p>
                    <p>{user.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ShoppingBagIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Total Pesanan</p>
                    <p>{user.orders} pesanan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Riwayat Pesanan</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: '#ORD-1234', date: '15 Jun 2023', total: 'Rp 250.000', status: 'Selesai' },
                    { id: '#ORD-1235', date: '10 Jun 2023', total: 'Rp 120.000', status: 'Selesai' },
                    { id: '#ORD-1236', date: '5 Jun 2023', total: 'Rp 350.000', status: 'Selesai' },
                  ].map((order, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center md:justify-start">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
