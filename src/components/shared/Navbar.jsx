"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { FaPaw } from "react-hot-toast"; // wait, let's use react-icons
import { MdPets } from "react-icons/md";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-500">
              <MdPets size={28} />
              PetAdopt
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
            <Link href="/pets" className="text-gray-700 hover:text-orange-500 font-medium">All Pets</Link>
            {user && (
              <>
                <Link href="/dashboard/my-requests" className="text-gray-700 hover:text-orange-500 font-medium">My Requests</Link>
                <Link href="/dashboard/add-pet" className="text-gray-700 hover:text-orange-500 font-medium">Add Pet</Link>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img 
                    src={user.photoUrl || "https://via.placeholder.com/40"} 
                    alt="profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-500" 
                  />
                  <span className="font-medium text-gray-700">{user.name}</span>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                    <Link href="/dashboard/my-listings" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-orange-500 text-white px-5 py-2 rounded-md font-medium hover:bg-orange-600 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
