"use client";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ClientProviders({ children }) {
  const router = useRouter();
  
  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-right" />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
