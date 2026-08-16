"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { MdPets, MdMenu, MdClose, MdLogout, MdDashboard } from "react-icons/md";
import { Button, Avatar } from "@heroui/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => pathname === path || (path !== "/" && pathname.startsWith(path));

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-500 transition-colors">
                <MdPets className="text-orange-500 group-hover:text-white transition-colors" size={24} />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Pet<span className="text-orange-500">Adopt</span></span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link href="/" className={`font-medium transition-colors ${isActive("/") ? "text-orange-500" : "text-gray-600 dark:text-slate-300 hover:text-orange-500"}`}>Home</Link>
            <Link href="/pets" className={`font-medium transition-colors ${isActive("/pets") ? "text-orange-500" : "text-gray-600 dark:text-slate-300 hover:text-orange-500"}`}>All Pets</Link>
            {user && (
              <>
                <Link href="/dashboard/my-requests" className={`font-medium transition-colors ${isActive("/dashboard/my-requests") ? "text-orange-500" : "text-gray-600 dark:text-slate-300 hover:text-orange-500"}`}>My Requests</Link>
                <Link href="/dashboard/add-pet" className={`font-medium transition-colors ${isActive("/dashboard/add-pet") ? "text-orange-500" : "text-gray-600 dark:text-slate-300 hover:text-orange-500"}`}>Add Pet</Link>
              </>
            )}
          </div>

          {/* Right: Auth & Profile */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center">
              {isPending ? (
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
              ) : user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none transition-transform hover:scale-105 cursor-pointer"
                  >
                    <img 
                      src={user.image || "https://via.placeholder.com/150"} 
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full border-2 border-orange-500 object-cover shadow-sm"
                    />
                  </button>

                  {isDropdownOpen && (
                    <>
                      {/* Invisible overlay to close dropdown on click outside */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                      ></div>
                      
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 py-1">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                        </div>
                        
                        <div className="py-1">
                          <Link 
                            href="/dashboard/my-listings" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <MdDashboard size={18} />
                            Dashboard
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 dark:border-slate-800 py-1">
                          <button 
                            onClick={() => {
                              setIsDropdownOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                          >
                            <MdLogout size={18} />
                            Log Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className={`px-4 py-2 font-bold rounded-lg transition-colors ${isActive("/login") ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-500 hover:text-white"}`}>
                    Log in
                  </Link>
                  <Link href="/register" className={`px-4 py-2 font-bold rounded-lg transition-colors ${isActive("/register") ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-500 hover:text-white"}`}>
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            <ThemeSwitcher />

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-slate-300 hover:text-orange-500 p-2">
                {isMobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-slate-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"}`}>Home</Link>
          <Link href="/pets" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/pets") ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-slate-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"}`}>All Pets</Link>
          {user ? (
            <>
              <Link href="/dashboard/my-requests" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/dashboard/my-requests") ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-slate-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"}`}>My Requests</Link>
              <Link href="/dashboard/add-pet" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/dashboard/add-pet") ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-slate-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"}`}>Add Pet</Link>
              <Link href="/dashboard/my-listings" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard/my-listings" || pathname === "/dashboard" ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-slate-200 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"}`}>Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">Log Out</button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" className={`w-full text-center px-4 py-2 font-bold rounded-lg transition-colors ${isActive("/login") ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-500 hover:text-white"}`}>Log in</Link>
              <Link href="/register" className={`w-full text-center px-4 py-2 font-bold rounded-lg transition-colors ${isActive("/register") ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-500 hover:text-white"}`}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
