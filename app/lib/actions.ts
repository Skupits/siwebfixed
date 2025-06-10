'use server';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  customerId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
});

// CREATE
export async function createTransaction(formData: FormData) {
  const { customerId, productId, quantity, status } = FormSchema.parse({
    customerId: formData.get('customerId'),
    productId: formData.get('productId'),
    quantity: formData.get('quantity'),
    status: formData.get('status'),
  });

  const [product] = await sql`
    SELECT harga FROM produk WHERE id_produk = ${productId}
  `;

  if (!product) throw new Error('Produk tidak ditemukan');

  const totalHarga = parseFloat(product.harga) * quantity;
  const tanggal = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO transaksi (id_customers, id_produk, tanggal, total_harga, status)
    VALUES (${customerId}, ${productId}, ${tanggal}, ${totalHarga}, ${status})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// UPDATE
export async function updateTransaction(id: string, formData: FormData) {
  const { customerId, productId, quantity, status } =
    FormSchema.parse({
      customerId: formData.get('customerId'),
      productId: formData.get('productId'),
      quantity: formData.get('quantity'),
      status: formData.get('status') || 'pending',
    });

  const [product] = await sql`
    SELECT harga FROM produk WHERE id_produk = ${productId}
  `;

  if (!product) throw new Error('Produk tidak ditemukan');

  const totalHarga = parseFloat(product.harga) * quantity;

  await sql`
    UPDATE transaksi
    SET id_customers = ${customerId},
        id_produk = ${productId},
        total_harga = ${totalHarga},
        status = ${status}
    WHERE id_transaksi = ${parseInt(id)}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// DELETE
export async function deleteTransaction(id: string) {
  await sql`
    DELETE FROM transaksi WHERE id_transaksi = ${parseInt(id)}
  `;

  revalidatePath('/dashboard/invoices');
}