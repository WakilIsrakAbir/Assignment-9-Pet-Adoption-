"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdPets, MdMenu, MdClose, MdLogout, MdDashboard } from "react-icons/md";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-500 transition-colors">
                <MdPets className="text-orange-500 group-hover:text-white transition-colors" size={24} />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Adopt</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link href="/pets" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">All Pets</Link>
            
            {isPending ? (
              <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
            ) : user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="warning"
                    name={user.name}
                    size="sm"
                    src={user.image || "https://via.placeholder.com/150"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold text-orange-500 truncate">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" startContent={<MdDashboard />} onClick={() => router.push("/dashboard/my-listings")}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" startContent={<MdLogout />} onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex gap-3">
                <Button as={Link} href="/login" variant="flat" color="warning" className="font-bold">
                  Log in
                </Button>
                <Button as={Link} href="/register" color="warning" variant="shadow" className="text-white font-bold">
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-orange-500 p-2">
              {isMobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50">Home</Link>
          <Link href="/pets" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50">All Pets</Link>
          {user ? (
            <>
              <Link href="/dashboard/my-listings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Log Out</button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Button as={Link} href="/login" variant="flat" color="warning" className="w-full font-bold">Log in</Button>
              <Button as={Link} href="/register" color="warning" variant="shadow" className="w-full text-white font-bold">Sign up</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
