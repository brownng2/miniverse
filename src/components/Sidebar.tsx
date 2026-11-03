"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navItems";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 shrink-0 bg-[#2b1f1a] px-5 py-8 text-[#f7eadf]">
      {/* Miniverse Branding */}
      <div className="mb-10 px-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Miniverse ☕
        </h1>

        <p className="mt-2 text-sm text-[#d8bba8]">
          your cozy little universe
        </p>

        <div className="mt-5 h-px bg-[#6b5045]" />
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#d9a5a5] text-[#35251f] shadow-md"
                  : "text-[#ead8cb] hover:bg-[#4a352d]"
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Message */}
      <div className="mt-12 rounded-2xl bg-[#4a352d] p-4">
        <p className="text-sm font-semibold">
          🌙 A little reminder
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[#d8bba8]">
          You don't have to do everything today.
          Just keep growing at your own pace.
        </p>
      </div>
    </aside>
  );
}
