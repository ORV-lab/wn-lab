import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Novel } from "@/data/mockData";

interface NovelCardProps {
  novel: Novel;
  size?: "sm" | "md";
}

const NovelCard = ({ novel, size = "sm" }: NovelCardProps) => {
  const width = size === "sm" ? "w-32" : "w-40";

  return (
    <Link
      to={`/novel/${novel.id}`}
      className={`flex-shrink-0 ${width} group`}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
        <img
          src={novel.cover}
          alt={novel.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-foreground">{novel.rating}</span>
          </div>
        </div>
        {novel.status === "completed" && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium">
            Завершено
          </div>
        )}
      </div>
      <h3 className="mt-2 text-sm font-medium leading-tight line-clamp-2 text-foreground">
        {novel.title}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">{novel.author}</p>
    </Link>
  );
};

export default NovelCard;
