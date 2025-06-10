'use server';

import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteProduct(id: number) {
  await prisma.produk.delete({
    where: {
      id_produk: id,
    },
  });
  
  revalidatePath('/dashboard/products');
}