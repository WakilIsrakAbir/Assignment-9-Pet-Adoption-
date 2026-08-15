"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdPets, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Card, CardHeader, CardContent, CardFooter } from "@heroui/react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast.error(error.message || "Invalid credentials");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard/my-listings");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-6 shadow-xl rounded-2xl">
        <CardHeader className="flex-col items-center gap-2 mb-4">
          <div className="text-orange-500">
            <MdPets size={48} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="text-center text-sm text-gray-600">
            Sign in to access your account
          </p>
        </CardHeader>
        
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-500"
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-orange-500 hover:text-orange-400">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
