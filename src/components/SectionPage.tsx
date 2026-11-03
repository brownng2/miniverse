import Link from "next/link";

type SectionPageProps = {
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
};

export default function SectionPage({
  title,
  subtitle,
  emoji,
  description,
}: SectionPageProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#a38481]">
          ✦ WELCOME TO YOUR SPACE
        </p>

        <h1 className="mt-4 font-serif text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-3 text-sm text-[#947c76]">
          {subtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-[#eee1da] bg-[#fffaf6] px-6 py-14 text-center shadow-sm">
        <div className="text-6xl">{emoji}</div>

        <h2 className="mt-6 font-serif text-2xl font-bold">
          Your next little adventure starts here
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#947c76]">
          {description}
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-xl bg-[#49332f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#624944]"
        >
          Back to my dashboard ♡
        </Link>
      </div>
    </div>
  );
}
