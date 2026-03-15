import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/data/mockData";

const allGenres = ["Все", "Фэнтези", "Боевик", "Приключения", "Культивация", "Романтика", "Научная фантастика", "Киберпанк", "Драма", "Комедия", "Система"];
const statusFilters = ["Все", "В процессе", "Завершено"];
const sortOptions = ["По рейтингу", "По обновлению", "По главам"];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Все");
  const [status, setStatus] = useState("Все");
  const [sort, setSort] = useState("По рейтингу");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  let filtered = novels.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "Все" || n.genres.includes(genre);
    const matchStatus = status === "Все" || (status === "Завершено" ? n.status === "completed" : n.status === "ongoing");
    return matchSearch && matchGenre && matchStatus;
  });

  if (sort === "По рейтингу") filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === "По главам") filtered.sort((a, b) => b.chaptersCount - a.chaptersCount);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-20 md:pt-20">
      <div className="px-4 pt-8">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-4">Каталог</h1>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или автору..."
              className="w-full h-12 pl-12 pr-4 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Filter toggle + view */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
              Фильтры
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-xl transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-xl transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Жанр</p>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((g) => (
                    <button key={g} onClick={() => setGenre(g)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${genre === g ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Статус</p>
                <div className="flex gap-2">
                  {statusFilters.map((s) => (
                    <button key={s} onClick={() => setStatus(s)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${status === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Сортировка</p>
                <div className="flex gap-2">
                  {sortOptions.map((s) => (
                    <button key={s} onClick={() => setSort(s)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${sort === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-4">Найдено: {filtered.length}</p>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filtered.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((novel) => (
                <a key={novel.id} href={`/novel/${novel.id}`} className="flex gap-3 p-3 bg-card rounded-2xl border border-border hover:bg-secondary/50 transition-colors">
                  <img src={novel.cover} alt={novel.title} className="w-16 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{novel.title}</h3>
                    <p className="text-xs text-muted-foreground">{novel.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-primary">★ {novel.rating}</span>
                      <span className="text-xs text-muted-foreground">{novel.chaptersCount} глав</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${novel.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"}`}>
                        {novel.status === "completed" ? "Завершено" : "В процессе"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{novel.description}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Ничего не найдено</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Catalog;
