import Link from "next/link";
import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  emoji: string;
  children: ReactNode;
  href?: string;
};

export default function DashboardCard({
  title,
  emoji,
  children,
  href,
}: DashboardCardProps) {
  const content = (
    <div className="h-full rounded-2xl border border-[#eee1da] bg-[#fffaf6] p-5 shadow-[0_4px_16px_rgba(103,67,57,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold">
          {title}
        </h2>
        <span className="text-xl">{emoji}</span>
      </div>

      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
