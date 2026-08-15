"use client";

import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ClientProviders({ children }) {
  const router = useRouter();
  
  return (
    <HeroUIProvider navigate={router.push}>
      <Toaster position="top-right" />
      {children}
    </HeroUIProvider>
  );
}
