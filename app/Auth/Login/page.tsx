// pages/Auth/Login/page.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (username === 'admin123' && password === '12345') {
      router.push('/dashboard')
    } else if (username === 'user123' && password === '12345') {
      router.push('/user')
    } else {
      alert('Username atau password salah!')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Kiri - Logo dan branding */}
      <div className="w-1/2 bg-[#1f5226] text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-extrabold mb-6">ToLOng</h1>
        <img src="/2.png" alt="Cat Icon" className="w-32 h-32" />
      </div>

      {/* Kanan - Form login */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>

          <div className="mt-4 text-sm text-center">
            <a href="/Auth/Register" className="text-green-700 hover:underline mr-4">Daftar</a>
            <a href="/Auth/Lupapass" className="text-green-700 hover:underline">Lupa Password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}
