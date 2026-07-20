import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationToaster } from "@/components/ui/notification-toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { PWARegister } from "@/components/layout/pwa-register";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Raven Network | Learn. Contribute. Build. Earn.",
  description: "Join Africa's largest Web3 contributor network and connect millions of people to education, reputation, and global opportunities.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Raven Network",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-black text-white font-sans flex flex-col min-h-screen">
        <PWARegister />
        <ThemeProvider>
          <NotificationProvider>
            {children}
            <NotificationToaster />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
