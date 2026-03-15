import { useState } from "react";
import { motion } from "framer-motion";
import { History, Send, ExternalLink, Clock } from "lucide-react";

const genres = [
  "Фэнтези", "Боевик", "Романтика", "Культивация", "Научная фантастика",
  "Киберпанк", "Комедия", "Драма", "Система", "Приключения",
];

interface Request {
  id: number;
  url: string;
  genres: string[];
  status: "queue" | "translating" | "done";
  date: string;
}

const mockRequests: Request[] = [
  { id: 1, url: "https://example.cn/novel/12345", genres: ["Культивация", "Боевик"], status: "translating", date: "2 дня назад" },
  { id: 2, url: "https://example.cn/novel/67890", genres: ["Романтика"], status: "queue", date: "5 дней назад" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  queue: { label: "В очереди", color: "bg-yellow-500/10 text-yellow-400" },
  translating: { label: "Переводится", color: "bg-primary/10 text-primary" },
  done: { label: "Готово", color: "bg-green-500/10 text-green-400" },
};

const RawRequest = () => {
  const [url, setUrl] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [requests] = useState<Request[]>(mockRequests);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    alert("Заявка отправлена! (демо)");
    setUrl("");
    setSelectedGenres([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 md:pt-20 px-4 pt-8"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Запрос перевода</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-5 mb-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Ссылка на оригинал
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.cn/novel/..."
                required
                className="w-full h-11 pl-10 pr-4 rounded-2xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Жанры
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
            Отправить заявку
          </button>
        </form>

        {/* Requests list */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Мои заявки</h2>
          <div className="space-y-3">
            {requests.map((req) => {
              const status = statusLabels[req.status];
              return (
                <div
                  key={req.id}
                  className="bg-card rounded-2xl border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-foreground font-mono truncate max-w-[70%]">
                      {req.url}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {req.genres.map((g) => (
                      <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {g}
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {req.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RawRequest;
