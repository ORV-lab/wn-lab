import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpenText, Star } from "lucide-react";
import type { Novel } from "@/data/mockData";

interface NovelCardProps {
  novel: Novel;
  size?: "sm" | "md";
}

const sizeClassMap = {
  sm: "w-[11.25rem]",
  md: "w-[13rem]",
} as const;

const NovelCard = ({ novel, size = "sm" }: NovelCardProps) => {
  return (
    <Link to={`/novel/${novel.id}`} className={`group block flex-shrink-0 ${sizeClassMap[size]}`}>
      <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#162331] text-white shadow-[0_18px_44px_rgba(15,23,42,0.24)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={novel.cover}
            alt={novel.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09131f] via-[#09131f]/12 to-transparent" />

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/72 backdrop-blur-sm">
              {novel.status === "completed" ? "Finished" : "Ongoing"}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-white/88 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-[#f5c66b] text-[#f5c66b]" />
              {novel.rating.toFixed(1)}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/58">Chapter</p>
              <p className="mt-1 text-base font-semibold text-white">{novel.latestChapter}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-white">
              {novel.title}
            </h3>
            <p className="mt-1 text-sm text-white/62">{novel.author}</p>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-white/62">
            <span className="flex items-center gap-1.5">
              <BookOpenText className="h-3.5 w-3.5" />
              {novel.chaptersCount} chapters
            </span>
            <span className="truncate">{novel.genres[0]}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NovelCard;
