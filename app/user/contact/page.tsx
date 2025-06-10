// app/user/contact/page.tsx
import { lusitana } from '@/app/ui/fonts';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  // Data kontak toko
  const contactInfo = {
    name: 'Toko TolOng',
    email: 'info@tolong.com',
    phone: '+62 812-3456-7890',
    whatsapp: '+62 812-3456-7890',
    address: 'Jl. Raya Bogor No. 123, Jakarta Timur',
    hours: 'Senin - Jumat: 08.00 - 17.00, Sabtu: 09.00 - 15.00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0537024167906!2d106.82704231476913!3d-6.2575909954733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4758d7c65%3A0x1f3d7c7b3d3b7c3d!2sJl.%20Raya%20Bogor%2C%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1625123456789!5m2!1sid!2sid',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-6`}>Hubungi Kami</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Informasi Kontak</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <EnvelopeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
                <p className="text-sm text-gray-500 mt-1">Kami akan membalas dalam 24 jam</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <PhoneIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Telepon & WhatsApp</h3>
                <p className="text-gray-600">{contactInfo.phone}</p>
                <p className="text-sm text-gray-500 mt-1">Senin - Jumat, 09.00 - 17.00</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPinIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Alamat</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Jam Operasional</h3>
                <p className="text-gray-600">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Kirim Pesan</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subjek
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Lokasi Kami</h2>
        <div className="w-full h-96 rounded-xl overflow-hidden">
          <iframe
            src={contactInfo.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
