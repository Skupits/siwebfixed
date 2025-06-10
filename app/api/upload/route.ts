import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Buat nama file unik
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `product_${Date.now()}.${fileExt}`;
    const filePath = join(process.cwd(), 'public/uploads', fileName);
    
    // Simpan file
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      fileName,
      path: `/uploads/${fileName}` 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Gagal mengupload file' },
      { status: 500 }
    );
  }
}