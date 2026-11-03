"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navItems";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 bg-[#49332f] px-4 py-6 text-[#f9eae0] md:min-h-screen md:w-56 md:px-4 md:py-8">
      <div className="px-3 pb-7">
        <Link
          href="/"
          className="font-serif text-3xl font-bold tracking-tight"
        >
          miniverse <span className="text-[#efbfc2]">✿</span>
        </Link>

        <p className="mt-2 text-xs text-[#d6b8ad]">
          your little corner of the universe
        </p>
      </div>

      <p className="hidden px-3 pb-3 text-[10px] tracking-[0.2em] text-[#cbaea5] md:block">
        YOUR SPACE
      </p>

      <nav className="flex gap-1 overflow-x-auto md:flex-col md:gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active
                  ? "bg-[#e2b9b6] font-semibold text-[#49332f]"
                  : "text-[#f0ded5] hover:bg-[#624944]"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-14 hidden rounded-2xl bg-[#604742] p-4 md:block">
        <p className="text-sm font-semibold">
          🌙 A little reminder
        </p>
        <p className="mt-2 text-xs leading-6 text-[#ead1c6]">
          Bloom at your own pace. You are doing enough.
        </p>
      </div>
    </aside>
  );
}
