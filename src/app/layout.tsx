import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Miniverse ☕",
  description: "A cozy, anime-inspired personal life dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-[#f7eadf] text-[#35251f]">
          <Sidebar />

          <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
