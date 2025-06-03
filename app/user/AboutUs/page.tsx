import Image from "next/image";


export default function Page() {
  return (
    <>
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 flex justify-center">
        <div className="w-full max-w-[1070px] border border-black bg-white rounded-2xl p-6">
          {/* Judul */}
          {/* <h1 className="text-center text-black text-3xl font-bold mb-6">
          About Us
        </h1> */}

          {/* Paragraf pertama + gambar */}
          <div className="flex flex-col md:flex-row items-center m-6 justify-between">
            {/* Lingkaran orange dengan gambar di dalamnya */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-72 h-72 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/bg.png"
                  alt="Toko ToIOng"
                  width={700}
                  height={700}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Paragraf */}
            <div className="w-full md:w-1/2">
              <h1 className="text-center text-black text-3xl font-bold mb-6 mt-6">
                ToIOng
              </h1>
              <p className="text-gray-700 leading-relaxed text-justify">
                Toko kelontong <strong>ToIOng</strong> milik Pak Rangga adalah
                sebuah usaha sederhana yang memadukan cara berjualan tradisional
                dan modern. Berdiri di sudut kota yang sibuk, toko ini
                menawarkan berbagai kebutuhan sehari-hari seperti sembako,
                peralatan rumah tangga sederhana, hingga mainan kecil untuk
                anak-anak. Suasana di dalam toko terasa hangat dengan aroma khas
                kopi bubuk dan rempah-rempah yang memenuhi udara.
              </p>
            </div>
          </div>

          {/* Paragraf lanjutan */}
          <p className="text-gray-700 leading-relaxed m-6 text-justify">
            Pak Rangga, pemilik toko yang ramah dan murah senyum, selalu siap
            melayani pelanggan dengan penuh perhatian. Di toko fisiknya, ia
            berinteraksi langsung dengan pelanggan, mendengarkan cerita mereka,
            dan memberikan rekomendasi barang yang tepat. Namun, seiring
            perkembangan teknologi, Pak Rangga juga beradaptasi dengan membuka
            toko online. Melalui platform daring, ia dapat melayani pelanggan
            dari berbagai tempat, bahkan dari luar kota. Keberadaan toko online
            memungkinkan ToIOng menjangkau lebih banyak pelanggan yang mungkin
            tidak bisa datang langsung. Meski begitu, Pak Rangga tetap menjaga
            kualitas pelayanan dengan memastikan setiap pesanan diproses dengan
            cermat dan cepat. Kehangatan pelayanan yang ia berikan secara
            langsung tetap terasa meski dalam transaksi online. Toko kelontong
            ToIOng bukan sekadar tempat berbelanja, tetapi juga ruang di mana
            warga sekitar merasa diperhatikan dan dihargai. Dengan usaha yang
            gigih dan adaptasi yang cerdas, Pak Rangga berhasil menjadikan
            ToIOng sebagai toko kelontong yang mampu bertahan di tengah
            persaingan pasar yang semakin ketat. Harapannya sederhana, agar
            ToIOng selalu dapat menjadi tempat yang memberi manfaat bagi banyak
            orang baik yang datang langsung maupun yang memesan dari jauh.
          </p>

          <p className="text-gray-700 leading-relaxed m-6">
            Terima kasih telah mempercayai kami sebagai pilihan belanja Anda!
          </p>
        </div>
      </div>
    </>
  );
}


