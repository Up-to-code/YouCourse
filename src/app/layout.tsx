import type { Metadata } from "next";
import "./globals.css";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
  
export const metadata: Metadata = {
  title: "You Course",
  description: "You Course is a platform that provides you with the best online courses for your learning needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark:bg-background ${
        typeof document !== "undefined" &&
        document.documentElement.className
      }`}>
      <EnhancedNavbar/>
         {children}
        </body>
    </html>
  );
}
