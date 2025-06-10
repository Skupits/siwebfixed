import { PrismaClient } from "@/generated/prisma";
import { formatCurrency } from "./utils";

const prisma = new PrismaClient();

// Jika belum ada, definisikan tipe di sini atau di file terpisah (misal types.ts)
interface Customer {
  id_customer: string;
  name: string;
}

interface Product {
  id_produk: string;
  nama_produk: string;
}

interface Transaction {
  id_transaksi: string;
  id_customers: string;
  id_produk: string;
  quantity: number;
  total_harga: number;
  tanggal: Date;
  status: 'pending' | 'paid';
}

// Fungsi utama untuk analitik ringkas
export async function fetchAnalyticsData() {
  try {
    const totalProductsPromise = prisma.produk.count();

    const totalRevenuePromise = prisma.transaksi.aggregate({
      where: { status: "paid" },
      _sum: {
        total_harga: true,
      },
    });

    const mostSoldProductPromise = prisma.transaksi.groupBy({
      by: ["id_produk"],
      _count: {
        id_produk: true,
      },
      orderBy: {
        _count: {
          id_produk: "desc",
        },
      },
      take: 1,
    });

    const [totalProducts, totalRevenue, mostSoldGroup] = await Promise.all([
      totalProductsPromise,
      totalRevenuePromise,
      mostSoldProductPromise,
    ]);

    let mostSoldProductName = "-";
    let mostSoldCount = 0;

    if (mostSoldGroup.length > 0) {
      const mostSold = mostSoldGroup[0];

      const product = await prisma.produk.findUnique({
        where: {
          id_produk: mostSold.id_produk ?? undefined,
        },
      });

      mostSoldProductName = product?.nama_produk || "-";
      mostSoldCount = mostSold._count.id_produk;
    }

    return {
      totalProducts,
      totalRevenue: formatCurrency(Number(totalRevenue._sum.total_harga ?? 0)),
      mostSoldProduct: {
        name: mostSoldProductName,
        count: mostSoldCount,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch analytics data.");
  }
}

// Ambil 5 produk terlaris
export async function fetchMostSoldProducts() {
  try {
    const data = await prisma.transaksi.groupBy({
      by: ["id_produk"],
      _count: {
        id_produk: true,
      },
      orderBy: {
        _count: {
          id_produk: "desc",
        },
      },
      take: 5,
    });

    const result = await Promise.all(
      data.map(async (item) => {
        const produk = await prisma.produk.findUnique({
          where: {
            id_produk: item.id_produk ?? undefined,
          },
        });
        return {
          name: produk?.nama_produk || "Produk Tidak Diketahui",
          count: item._count.id_produk,
        };
      })
    );

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch most sold products.");
  }
}

// Fetch data transaksi dengan relasi produk dan customer
export async function fetchTransactionTable(query: string, currentPage: number) {
  const ITEMS_PER_PAGE = 10;
  try {
    const data = await prisma.transaksi.findMany({
      where: {
        OR: [
          { produk: { nama_produk: { contains: query, mode: "insensitive" } } },
          { customers: { name: { contains: query, mode: "insensitive" } } }, 
          // Asumsi relasi ke model customers benar
        ],
      },
      include: {
        produk: {
          select: {
            nama_produk: true,
            foto: true,
          },
        },
        customers: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        id_transaksi: "desc",
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    return data.map((trx) => ({
      id_transaksi: trx.id_transaksi,
      nama_produk: trx.produk?.nama_produk ?? "Produk tidak ditemukan",
      nama_pembeli: trx.customers?.name ?? "Pembeli tidak ditemukan",
      total_harga: trx.total_harga,
      tanggal: trx.tanggal,
      status: trx.status,
      image_url: trx.customers?.image_url ?? null,
    }));
  } catch (error) {
    console.error("Gagal ambil data transaksi:", error);
    throw new Error("Gagal mengambil data transaksi");
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  const customers = await prisma.customers.findMany(); // Pastikan model ini sesuai Prisma schema (mungkin 'customer' saja)
  return customers.map((cust) => ({
    id_customer: cust.id.toString(),
    name: cust.name,
  }));
}

export async function fetchProducts(): Promise<Product[]> {
  const products = await prisma.produk.findMany(); // Ganti jadi 'produk' kalau itu model di schema
  return products.map((prod) => ({
    id_produk: prod.id_produk.toString(),
    nama_produk: prod.nama_produk,
  }));
}

export async function fetchTransactionById(id: string): Promise<Transaction | null> {
  try {
    const transaction = await prisma.transaksi.findUnique({
      where: {
        id_transaksi: parseInt(id)
      }
    });
    
    if (!transaction) return null;
    
    // Gunakan nullish coalescing untuk menghindari error null
    const id_customers = transaction.id_customers ?? '';
    const id_produk = transaction.id_produk ?? 0;
    
    return {
      id_transaksi: transaction.id_transaksi.toString(),
      id_customers: id_customers.toString(),
      id_produk: id_produk.toString(),
      quantity: 1, // Default quantity karena tidak ada di schema
      total_harga: Number(transaction.total_harga),
      tanggal: transaction.tanggal,
      status: transaction.status as 'pending' | 'paid'
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction.");
  }
}

export async function fetchTransactionsPages(query: string): Promise<number> {
  const ITEMS_PER_PAGE = 5;
  try {
    const totalCount = await prisma.transaksi.count({
      where: {
        OR: [
          { produk: { nama_produk: { contains: query, mode: 'insensitive' } } },
          { customers: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
    });
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Gagal menghitung halaman transaksi:", error);
    return 1;
  }
}