import Link from "next/link";

type DashboardCardProps = {
  title: string;
  value: string;
  emoji: string;
  href?: string;
};

export default function DashboardCard({
  title,
  value,
  emoji,
  href,
}: DashboardCardProps) {
  const content = (
    <div className="group h-full rounded-[2rem] border border-white/70 bg-white/65 p-6 shadow-[0_10px_30px_rgba(53,37,31,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-4xl">{emoji}</span>
        {href && (
          <span className="text-[#9b7b8f] transition-transform group-hover:translate-x-1">
            ↗
          </span>
        )}
      </div>

      <h2 className="text-xl font-semibold text-[#35251f]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-[#8b6f63]">
        {value}
      </p>
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
