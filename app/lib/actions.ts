'use server';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  customerId: z.string(),
  productId: z.string(), // jika ID produk UUID, jika integer ubah jadi z.coerce.number()
  quantity: z.coerce.number().min(1),
});

export async function createTransaction(formData: FormData) {
  const { customerId, productId, quantity } = FormSchema.parse({
    customerId: formData.get('customerId'), // ✅ sudah benar
    productId: formData.get('productId'),
    quantity: formData.get('quantity'),
  });

  // Ambil harga produk dari database
  const [product] = await sql`
    SELECT harga FROM produk WHERE id_produk = ${productId}
  `;

  if (!product) throw new Error('Produk tidak ditemukan');

  const totalHarga = parseFloat(product.harga) * quantity;
  const tanggal = new Date().toISOString().split('T')[0];
  const status = 'pending';

  await sql`
    INSERT INTO transaksi (id_customers, id_produk, tanggal, total_harga, status)
    VALUES (${customerId}, ${productId}, ${tanggal}, ${totalHarga}, ${status})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function UpdateTransaction(formData: FormData) {
    const { customerId, productId, quantity } = FormSchema.parse({
      customerId: formData.get('customerId'), // ✅ sudah benar
      productId: formData.get('productId'),
      quantity: formData.get('quantity'),
    });
  
    // Ambil harga produk dari database
    const [product] = await sql`
      SELECT harga FROM produk WHERE id_produk = ${productId}
    `;
  
    if (!product) throw new Error('Produk tidak ditemukan');
  
    const totalHarga = parseFloat(product.harga) * quantity;
    const tanggal = new Date().toISOString().split('T')[0];
    const status = 'pending';
  
    await sql`
      INSERT INTO transaksi (id_customers, id_produk, tanggal, total_harga, status)
      VALUES (${customerId}, ${productId}, ${tanggal}, ${totalHarga}, ${status})
    `;
  
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }