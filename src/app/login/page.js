"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@heroui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
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
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-gray-600">
            Sign in to manage your adoption requests
          </p>
        </CardHeader>
        
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              isRequired
              label="Email"
              type="email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isRequired
              label="Password"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              color="warning"
              variant="shadow"
              isLoading={loading}
              className="mt-4 text-white font-bold"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-orange-500 hover:text-orange-400">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
