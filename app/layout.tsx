import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description: "Securely save and manage your favorite links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen
          bg-gradient-to-br 
          from-slate-950 
          via-slate-900 
          to-gray-900
          text-gray-100
        `}
      >
        <div className="relative">
          {/* subtle background glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.15),transparent_40%)]" />
          
          {children}
        </div>
      </body>
    </html>
  );
}
