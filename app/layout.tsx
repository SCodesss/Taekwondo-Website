import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "District Taekwondo Association Dehradun",
  description: "Official governing body for Taekwondo in Dehradun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        {/* Global Alert */}
        <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-bold uppercase tracking-wider overflow-hidden">
          <p className="animate-pulse">
            🚨 Upcoming: 13th Open National Taekwondo Kyorugi & Poomsae Tournament | I.G.I Stadium | 29-31 May 2026
          </p>
        </div>

        {/* Global Navigation */}
        <nav className="border-b border-gray-200 py-4 px-8 flex justify-between items-center bg-white sticky top-0 z-50">
          <Link href="/" className="font-black text-2xl tracking-tighter text-red-600">
            DTADDN
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-semibold uppercase text-gray-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <Link href="/about" className="hover:text-red-600">About</Link>
            <Link href="/officials" className="hover:text-red-600">Officials</Link>
            <Link href="/events" className="hover:text-red-600">Events</Link>
            <Link href="/contact" className="hover:text-red-600">Contact</Link>
          </div>
        </nav>

        {/* This is where individual pages will render */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-8 text-center text-sm mt-auto">
          <p>B-39, Rakshapuram, Ladpur, P.O.-Raipur, Dehradun (Uttarakhand)</p>
          <p className="mt-2">📞 +91 9412975549 | ✉️ dtaddn@gmail.com</p>
          <p className="mt-8">© {new Date().getFullYear()} District Taekwondo Association.</p>
        </footer>
      </body>
    </html>
  );
}