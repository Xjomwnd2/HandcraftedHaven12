// app/account/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // In a real application, this would be an API call to fetch user details
      // For demo purposes, we're using a timeout to simulate an API call
      setTimeout(() => {
        // Check if user is authenticated (would typically check a token or session)
        const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
        
        if (isLoggedIn) {
          setUser({
            name: localStorage.getItem('userName') || 'John Doe',
            email: localStorage.getItem('userEmail') || 'john.doe@example.com',
            isLoading: false,
            isAuthenticated: true
          });
        } else {
          setUser({
            name: '',
            email: '',
            isLoading: false,
            isAuthenticated: false
          });
        }
      }, 1000);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser({
      name: '',
      email: '',
      isLoading: false,
      isAuthenticated: false
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // In a real application, this would validate credentials against an API
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', 'John Doe');
      localStorage.setItem('userEmail', email);
      
      setUser({
        name: 'John Doe',
        email: email,
        isLoading: false,
        isAuthenticated: true
      });
    }
  };

  if (user.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      {user.isAuthenticated ? (
        <div>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="mb-4">
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              <p className="text-gray-600">You have no recent orders.</p>
              <Link href="/products" className="text-blue-600 hover:underline block mt-4">
                Browse Products
              </Link>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
              <p className="text-gray-600">You have no saved addresses.</p>
              <button className="text-blue-600 hover:underline block mt-4">
                Add New Address
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>Don't have an account? <Link href="/account/register" className="text-blue-600 hover:underline">Register</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}