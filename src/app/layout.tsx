import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miniverse ✿",
  description: "Your cozy little corner of the universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen md:flex">
          <Sidebar />

          <main className="min-w-0 flex-1 bg-[radial-gradient(ellipse_at_85%_0%,#f8e4e4,transparent_50%)] px-5 py-7 md:px-9 md:py-9">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
