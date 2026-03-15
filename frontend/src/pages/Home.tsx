import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, TrendingUp, Clock, Star, ThumbsUp, MessageSquare, Layers } from "lucide-react";
import NovelCard from "@/components/NovelCard";
import { novels, latestUpdates, reviews, collections } from "@/data/mockData";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNovels = searchQuery
    ? novels.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : novels;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 md:pt-20"
    >
      {/* Hero */}
      <section className="relative px-4 pt-12 pb-8">
        <div className="max-w-screen-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">НовеллыRU</h1>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Лучшие веб-новеллы на русском языке</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск новелл..."
              className="w-full h-12 pl-12 pr-4 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Top of the week */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="px-4 pb-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Топ недели</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {filteredNovels.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest reviews */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="px-4 pb-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Свежие отзывы</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {reviews.slice(0, 4).map((review) => {
              const novel = novels.find((n) => n.id === review.novelId);
              return (
                <Link
                  key={review.id}
                  to={`/novel/${review.novelId}`}
                  className="flex-shrink-0 w-72 p-4 bg-card rounded-2xl border border-border hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={review.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{review.userName}</p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1 truncate">{review.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{review.text}</p>
                  {novel && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <img src={novel.cover} alt="" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs text-muted-foreground truncate">{novel.title}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.likes}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Collections */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.37 }} className="px-4 pb-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Коллекции</h2>
            </div>
            <Link to="/collections" className="text-xs text-primary hover:underline">Все →</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {collections.slice(0, 3).map((col) => (
              <Link key={col.id} to="/collections" className="flex-shrink-0 w-60 bg-card rounded-2xl border border-border overflow-hidden hover:bg-secondary/30 transition-colors">
                <div className="relative h-24 overflow-hidden">
                  <img src={col.cover} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-foreground truncate">{col.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{col.novelIds.length} новелл · ❤ {col.likes}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest updates */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="px-4 pb-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Последние обновления</h2>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {latestUpdates.map((update, i) => (
              <Link key={update.novelId + i} to={`/novel/${update.novelId}`} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{update.title}</p>
                  <p className="text-xs text-muted-foreground">Глава {update.chapter}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-3">{update.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
