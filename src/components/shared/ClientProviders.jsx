"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      {children}
    </AuthProvider>
  );
}
