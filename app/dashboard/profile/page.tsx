// app/dashboard/profile/page.tsx
import { lusitana } from '@/app/ui/fonts';
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, KeyIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ProfilePage() {
  // Data admin (dalam aplikasi nyata, ini akan diambil dari database)
  const admin = {
    name: 'Admin TolOng',
    email: 'admin@tolong.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Raya Bogor No. 123, Jakarta Timur',
    role: 'Administrator',
    joinDate: '15 Januari 2023',
    lastLogin: '2 jam yang lalu',
    avatar: '/Pulpen.png', // Gunakan gambar default
  };

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl mb-6`}>Profil Admin</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-green-900 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
              <Image 
                src={admin.avatar} 
                alt={admin.name} 
                width={128} 
                height={128} 
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-20 px-8 pb-8">
          <h2 className="text-2xl font-bold">{admin.name}</h2>
          <p className="text-green-600 font-medium">{admin.role}</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Informasi Kontak</h3>
              
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{admin.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p>{admin.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p>{admin.address}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Informasi Akun</h3>
              
              <div>
                <p className="text-sm text-gray-500">Tanggal Bergabung</p>
                <p>{admin.joinDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Login Terakhir</p>
                <p>{admin.lastLogin}</p>
              </div>
              
              <div className="pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  <KeyIcon className="w-5 h-5" />
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
            
            <div className="space-y-3">
              {[
                { action: 'Menambahkan produk baru', time: '2 jam yang lalu' },
                { action: 'Memperbarui stok produk', time: '1 hari yang lalu' },
                { action: 'Menghapus transaksi #1234', time: '3 hari yang lalu' },
                { action: 'Login ke sistem', time: '3 hari yang lalu' },
                { action: 'Mengubah profil', time: '1 minggu yang lalu' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <p>{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
