"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdList, MdAddCircle, MdPets, MdEdit, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const openEditModal = () => {
    setEditName(user?.name || "");
    setEditImage(user?.image || "");
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: editName,
        image: editImage,
      });
      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setIsEditModalOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending || !user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  const navItems = [
    { name: "My Listings", href: "/dashboard/my-listings", icon: MdList },
  ];

  const showSidebar = pathname === "/dashboard/my-listings";

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${showSidebar ? "flex flex-col md:flex-row gap-8" : ""}`}>
      {showSidebar && (
        <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:sticky top-24">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <img 
              src={user.image || "https://via.placeholder.com/150"} 
              alt={user.name}
              className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover shadow-sm shrink-0"
            />
            <div className="flex-1 overflow-hidden min-w-0">
              <div className="flex justify-between items-center gap-2">
                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                <button onClick={openEditModal} className="text-gray-400 hover:text-orange-500 transition-colors shrink-0" title="Edit Profile">
                  <MdEdit size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
      )}
      <main className={showSidebar ? "flex-1" : "max-w-5xl mx-auto w-full"}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
          {children}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <MdClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="url"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isUpdating}
                className="mt-4 w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 transition-colors"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
