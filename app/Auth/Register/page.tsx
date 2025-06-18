'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
        setError('Semua field harus diisi');
        setIsSubmitting(false);
        return;
      }

      if (formData.password.length < 5) {
        setError('Password minimal 5 karakter');
        setIsSubmitting(false);
        return;
      }

      // In a real app, you would send this data to the server
      // For now, we'll simulate a successful registration by storing in localStorage
      
      // Check if username already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (existingUsers.some((user: any) => user.username === formData.username)) {
        setError('Username sudah digunakan');
        setIsSubmitting(false);
        return;
      }

      // Store the new user
      existingUsers.push({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Show success message and redirect
      setSuccess(true);
      setTimeout(() => {
        router.push('/Auth/Login');
      }, 2000);
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-[#1f5226] flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl font-bold">ToLOng</h1>
        <img src="/2.png" alt="Cat Icon" className="w-24 h-24 mt-4" />
      </div>
      <div className="flex-1 bg-[#7aa883] flex flex-col justify-center p-12">
        <h2 className="text-center text-white text-2xl font-bold mb-6">WELCOME</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            Pendaftaran berhasil! Anda akan dialihkan ke halaman login...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            className="mb-4 p-2 rounded w-full" 
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            className="mb-4 p-2 rounded w-full" 
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="mb-4 p-2 rounded w-full" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="mb-4 p-2 rounded w-full" 
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type="submit"
            disabled={isSubmitting || success}
            className="bg-[#1f5226] text-white py-2 rounded w-full hover:bg-[#163a1b] transition disabled:bg-[#3a6642]"
          >
            {isSubmitting ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <a href="/Auth/Login" className="text-white hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}