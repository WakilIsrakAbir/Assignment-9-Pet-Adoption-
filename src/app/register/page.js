"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@heroui/react";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must have at least 6 characters, an uppercase and a lowercase letter.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoUrl,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Registration successful!");
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
            Create an Account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Join us to find or list your furry friends
          </p>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <Input
              isRequired
              label="Full Name"
              type="text"
              name="name"
              variant="bordered"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              isRequired
              label="Email"
              type="email"
              name="email"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Photo URL"
              type="url"
              name="photoUrl"
              variant="bordered"
              placeholder="https://..."
              value={formData.photoUrl}
              onChange={handleChange}
            />
            <Input
              isRequired
              label="Password"
              type="password"
              name="password"
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              color="warning"
              variant="shadow"
              isLoading={loading}
              className="mt-4 text-white font-bold"
            >
              Register
            </Button>
          </form>
        </CardBody>
        
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
