'use server';

import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema validasi untuk produk
const ProductSchema = z.object({
  nama_produk: z.string().min(1, 'Nama produk harus diisi'),
  harga: z.coerce.number().positive('Harga harus lebih dari 0'),
  stok: z.coerce.number().int().nonnegative('Stok tidak boleh negatif'),
  deskripsi: z.string().optional(),
  foto: z.string().optional(),
});

// Fungsi untuk mengambil semua produk
export async function fetchProducts() {
  try {
    const products = await prisma.produk.findMany({
      orderBy: {
        id_produk: 'desc',
      },
    });
    
    // Konversi Decimal ke number
    return products.map(product => ({
      ...product,
      harga: Number(product.harga)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Gagal mengambil data produk');
  }
}

// Fungsi untuk mengambil produk berdasarkan ID
export async function fetchProductById(id: number) {
  try {
    const product = await prisma.produk.findUnique({
      where: {
        id_produk: id,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Gagal mengambil data produk');
  }
}

// Fungsi untuk menambah produk baru
export async function createProduct(formData: FormData) {
  try {
    const validatedFields = ProductSchema.parse({
      nama_produk: formData.get('nama_produk'),
      harga: formData.get('harga'),
      stok: formData.get('stok'),
      deskripsi: formData.get('deskripsi') || '',
      foto: formData.get('foto') || '',
    });

    await prisma.produk.create({
      data: {
        nama_produk: validatedFields.nama_produk,
        harga: validatedFields.harga,
        stok: validatedFields.stok,
        deskripsi: validatedFields.deskripsi,
        foto: validatedFields.foto,
      },
    });

    revalidatePath('/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

// Fungsi untuk mengupdate produk
export async function updateProduct(id: number, formData: FormData) {
  try {
    const validatedFields = ProductSchema.parse({
      nama_produk: formData.get('nama_produk'),
      harga: formData.get('harga'),
      stok: formData.get('stok'),
      deskripsi: formData.get('deskripsi') || '',
      foto: formData.get('foto') || '',
    });

    await prisma.produk.update({
      where: {
        id_produk: id,
      },
      data: {
        nama_produk: validatedFields.nama_produk,
        harga: validatedFields.harga,
        stok: validatedFields.stok,
        deskripsi: validatedFields.deskripsi,
        foto: validatedFields.foto,
      },
    });

    revalidatePath('/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

// Fungsi untuk menghapus produk
export async function deleteProduct(id: number) {
  try {
    await prisma.produk.delete({
      where: {
        id_produk: id,
      },
    });

    revalidatePath('/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}