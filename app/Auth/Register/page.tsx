export default function Register() {
    return (
      <div className="flex min-h-screen">
        <div className="flex-1 bg-[#1f5226] flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold">ToLOng</h1>
          <img src="/2.png" alt="Cat Icon" className="w-24 h-24 mt-4" />
        </div>
        <div className="flex-1 bg-[#7aa883] flex flex-col justify-center p-12">
          <h2 className="text-center text-white mb-6">WELCOME</h2>
          <input type="text" placeholder="Full Name" className="mb-4 p-2 rounded w-full" />
          <input type="text" placeholder="Username" className="mb-4 p-2 rounded w-full" />
          <input type="email" placeholder="Email" className="mb-4 p-2 rounded w-full" />
          <input type="password" placeholder="Password" className="mb-4 p-2 rounded w-full" />
          <button className="bg-[#1f5226] text-white py-2 rounded">Sign Up</button>
        </div>
      </div>
    );
  }