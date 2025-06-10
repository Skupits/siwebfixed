'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logout() {
  // Hapus cookie atau token autentikasi
  (await
    // Hapus cookie atau token autentikasi
    cookies()).delete('authToken');
  
  // Redirect ke halaman login
  redirect('/Auth/Login');
}