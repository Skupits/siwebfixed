// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];
 const categories = [
  {
    id: 1,
    title: "Sembako",
    labelColor: "bg-pink-200 text-pink-800",
    image: "/image2.jpeg",
  },
  {
    id: 2,
    title: "Alat Tulis",
    labelColor: "bg-purple-200 text-purple-800",
    image: "/image3.png",
  },
  {
    id: 3,
    title: "Rumah Tangga",
    labelColor: "bg-orange-200 text-orange-800",
    image: "/image4.jpeg",
  },
  {
    id: 4,
    title: "Bumbu Dapur",
    labelColor: "bg-blue-200 text-blue-800",
    image: "/image5.jpeg",
  },
  {
    id: 5,
    title: "Snack",
    labelColor: "bg-green-200 text-green-800",
    image: "/image6.jpeg",
  },
  {
    id: 6,
    title: "Minuman",
    labelColor: "bg-yellow-200 text-yellow-800",
    image: "/image7.jpeg",
  },
  {
    id: 7,
    title: "Mainan",
    labelColor: "bg-red-200 text-red-800",
    image: "/image9.jpeg",
  },
  {
    id: 8,
    title: "Obat-Obatan",
    labelColor: "bg-indigo-200 text-indigo-800",
    image: "/image8.jpeg",
  },
];

 const products = [
  {
    id: 1,
    categoryId: 1,
    title: "Beras Pandan Wangi 5kg",
    rating: 4.9,
    reviewCount: 112,
    priceOriginal: 85000,
    priceDiscount: 82000,
    image: "/image3.png",
  },
  {
    id: 2,
    categoryId: 2,
    title: "Pulpen Hitam Standar",
    rating: 4.7,
    reviewCount: 78,
    priceOriginal: 5000,
    priceDiscount: 4500,
    image: "/image3.png",
  },
  {
    id: 3,
    categoryId: 3,
    title: "Set Sapu dan Pengki",
    rating: 4.8,
    reviewCount: 95,
    priceOriginal: 30000,
    priceDiscount: 28500,
    image: "/image3.png",
  },
  {
    id: 4,
    categoryId: 4,
    title: "Bawang Putih Bubuk",
    rating: 4.6,
    reviewCount: 40,
    priceOriginal: 15000,
    priceDiscount: 13000,
    image: "/image3.png",
  },
  {
    id: 5,
    categoryId: 5,
    title: "Keripik Singkong Balado",
    rating: 4.9,
    reviewCount: 102,
    priceOriginal: 12000,
    priceDiscount: 10000,
    image: "/image3.png",
  },
  {
    id: 6,
    categoryId: 6,
    title: "Teh Botol Sosro 450ml",
    rating: 4.7,
    reviewCount: 90,
    priceOriginal: 5000,
    priceDiscount: 4500,
    image: "/image3.png",
  },
  {
    id: 7,
    categoryId: 7,
    title: "Mainan Balok Kayu Edukatif",
    rating: 4.8,
    reviewCount: 65,
    priceOriginal: 75000,
    priceDiscount: 70000,
    image: "/image3.png",
  },
  {
    id: 8,
    categoryId: 8,
    title: "Paracetamol 500mg (10 Tablet)",
    rating: 4.9,
    reviewCount: 110,
    priceOriginal: 10000,
    priceDiscount: 8500,
    image: "/image3.png",
  },
];

 const teamData = [
  {
    id: 1,
    name: "Richardo Mario Martin",
    description: "VIKINGS yang terdampar di pulau NUSANTARA",
    image: "/1.jpg",
    tags: ["photography", "travel", "winter"],
  },
  {
    id: 2,
    name: "Putu Cahya Purnama",
    description: "Seorang petarung barbarian asal skotlandia selatan",
    image: "/2.jpg",
    tags: ["hiking", "exploration", "nature"],
  },
  {
    id: 3,
    name: "Adrial Ignatius Andi Lolo",
    description: "Seorang komedian asal skotlandia selatan",
    image: "/3.jpg",
    tags: ["hiking", "exploration", "nature"],
  },
];

 const user = teamData.find((member) => member.id === 2);

 const transactions = [
  {
    id: 1,
    userId: 2,
    date: "2025-04-05",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 5, quantity: 2 },
    ],
    total: 102000,
    status: "Selesai",
  },
  {
    id: 2,
    userId: 2,
    date: "2025-04-06",
    items: [
      { productId: 2, quantity: 3 },
      { productId: 4, quantity: 1 },
    ],
    total: 19500,
    status: "Selesai",
  },
  {
    id: 3,
    userId: 1,
    date: "2025-04-06",
    items: [{ productId: 6, quantity: 6 }],
    total: 27000,
    status: "Menunggu Pembayaran",
  },
];

 const inventory = [
  {
    id: 1,
    productsId: 1,
    stock: 50,
    minStock: 10,
    location: "Gudang A",
  },
  {
    id: 2,
    productsId: 2,
    stock: 200,
    minStock: 30,
    location: "Rak 1B",
  },
  {
    id: 3,
    productsId: 3,
    stock: 75,
    minStock: 15,
    location: "Gudang B",
  },
  {
    id: 4,
    productsId: 4,
    stock: 100,
    minStock: 20,
    location: "Rak 2A",
  },
  {
    id: 5,
    productsId: 5,
    stock: 80,
    minStock: 25,
    location: "Rak 3C",
  },
  {
    id: 6,
    productsId: 6,
    stock: 300,
    minStock: 50,
    location: "Rak 4D",
  },
  {
    id: 7,
    productsId: 7,
    stock: 40,
    minStock: 10,
    location: "Gudang C",
  },
  {
    id: 8,
    productsId: 8,
    stock: 150,
    minStock: 50,
    location: "Rak 5E",
  },
];



export { users, customers, invoices, revenue,categories,teamData,inventory,transactions,products };
