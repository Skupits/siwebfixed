import { PrismaClient } from "@/generated/prisma";
import { formatCurrency } from "./utils";
import { revalidatePath } from 'next/cache';

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

    // Fetch all transactions
    const transactionsPromise = prisma.transaksi.findMany();

    const [totalProducts, totalRevenue, transactions] = await Promise.all([
      totalProductsPromise,
      totalRevenuePromise,
      transactionsPromise,
    ]);

    // Calculate total quantity sold for each product
    // Assuming 1 transaction = 1 quantity (since quantity field doesn't exist in schema)
    const productQuantities: Record<number, number> = {};
    
    transactions.forEach(transaction => {
      if (transaction.id_produk) {
        const productId = transaction.id_produk;
        
        if (!productQuantities[productId]) {
          productQuantities[productId] = 0;
        }
        
        // Count each transaction as 1 item
        productQuantities[productId] += 1;
      }
    });
    
    // Find the most sold product by quantity
    let mostSoldProductId = 0;
    let mostSoldCount = 0;
    
    Object.entries(productQuantities).forEach(([id, count]) => {
      if (count > mostSoldCount) {
        mostSoldProductId = parseInt(id);
        mostSoldCount = count;
      }
    });
    
    let mostSoldProductName = "-";
    
    if (mostSoldProductId > 0) {
      const product = await prisma.produk.findUnique({
        where: {
          id_produk: mostSoldProductId,
        },
      });
      
      mostSoldProductName = product?.nama_produk || "-";
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

// Ambil 5 produk terlaris berdasarkan jumlah transaksi
export async function fetchMostSoldProducts() {
  try {
    // Use groupBy to count transactions per product
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
    
    // Fetch product details
    const result = await Promise.all(
      data.map(async (item) => {
        const produk = await prisma.produk.findUnique({
          where: {
            id_produk: item.id_produk ?? undefined,
          },
        });
        return {
          name: produk?.nama_produk || "Produk Tidak Diketahui",
          total: item._count.id_produk, // Use total instead of count for consistency
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

// Updated to return full product details
export async function fetchProducts(page = 1, limit = 8) {
  try {
    const skip = (page - 1) * limit;
    
    const [products, totalCount] = await Promise.all([
      prisma.produk.findMany({
        orderBy: {
          id_produk: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.produk.count(),
    ]);
    
    // Format products with proper types
    const formattedProducts = products.map(product => ({
      id_produk: product.id_produk.toString(),
      nama_produk: product.nama_produk,
      harga: Number(product.harga),
      stok: product.stok,
      foto: product.foto || null,
      deskripsi: product.deskripsi || null
    }));
    
    return {
      products: formattedProducts,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      totalPages: 1,
      currentPage: page,
      totalCount: 0
    };
  }
}

// Function to fetch a single product by ID
export async function fetchProductById(id: string | number) {
  try {
    const productId = typeof id === 'string' ? parseInt(id) : id;
    
    const product = await prisma.produk.findUnique({
      where: {
        id_produk: productId,
      },
    });
    
    if (!product) return null;
    
    return {
      id_produk: product.id_produk.toString(),
      nama_produk: product.nama_produk,
      harga: Number(product.harga),
      stok: product.stok,
      foto: product.foto || null,
      deskripsi: product.deskripsi || null
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
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

// Fungsi untuk menghapus produk
export async function deleteProduct(id: number) {
  try {
    // Check if product has related transactions
    const relatedTransactions = await prisma.transaksi.findMany({
      where: {
        id_produk: id
      }
    });

    if (relatedTransactions.length > 0) {
      return { 
        success: false, 
        error: 'Tidak dapat menghapus produk karena masih terkait dengan transaksi'
      };
    }

    // If no related transactions, proceed with deletion
    await prisma.produk.delete({
      where: {
        id_produk: id,
      },
    });

    revalidatePath('/dashboard/products');
    revalidatePath('/user/shop');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}