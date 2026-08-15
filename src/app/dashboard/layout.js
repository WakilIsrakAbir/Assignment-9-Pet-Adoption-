"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { MdList, MdAddCircle, MdPets } from "react-icons/md";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  const navItems = [
    { name: "My Listings", href: "/dashboard/my-listings", icon: MdList },
    { name: "Add Pet", href: "/dashboard/add-pet", icon: MdAddCircle },
    { name: "My Requests", href: "/dashboard/my-requests", icon: MdPets },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:sticky top-24">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <img src={user.photoUrl || "https://via.placeholder.com/50"} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-orange-500" />
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
          {children}
        </div>
      </main>
    </div>
  );
}
