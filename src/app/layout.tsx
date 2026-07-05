import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationToaster } from "@/components/ui/notification-toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raven Network | Learn. Contribute. Build. Earn.",
  description: "Join Africa's largest Web3 contributor network and connect millions of people to education, reputation, and global opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="bg-black text-white font-sans flex flex-col min-h-screen">
        <NotificationProvider>
          {children}
          <NotificationToaster />
        </NotificationProvider>
      </body>
    </html>
  );
}
