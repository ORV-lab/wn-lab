import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, BookOpen, ChevronLeft, Search, Clock, Tag, MessageCircle, ThumbsUp, Send } from "lucide-react";
import { novels, chapters, reviews, comments } from "@/data/mockData";

type Tab = "info" | "comments" | "reviews";

const NovelInfo = () => {
  const { id } = useParams();
  const novel = novels.find((n) => n.id === id);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [chapterSearch, setChapterSearch] = useState("");
  const [page, setPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const perPage = 10;

  if (!novel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Новелла не найдена
      </div>
    );
  }

  const novelReviews = reviews.filter((r) => r.novelId === id);
  const novelComments = comments.filter((c) => c.novelId === id);

  const filteredChapters = chapterSearch
    ? chapters.filter((ch) =>
        ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
        ch.number.toString().includes(chapterSearch)
      )
    : chapters;

  const paginatedChapters = filteredChapters.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredChapters.length / perPage);

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "info", label: "Информация" },
    { key: "comments", label: "Комментарии", count: novelComments.length },
    { key: "reviews", label: "Отзывы", count: novelReviews.length },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-20 md:pt-20">
      {/* Blurred cover header */}
      <div className="relative h-64 overflow-hidden">
        <img src={novel.cover} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="relative z-10 h-full flex items-end px-4 pb-4">
          <Link to="/" className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Info block */}
      <div className="px-4 -mt-20 relative z-10">
        <div className="max-w-screen-lg mx-auto flex gap-4">
          <img src={novel.cover} alt={novel.title} className="w-28 h-[150px] rounded-2xl object-cover shadow-xl flex-shrink-0" />
          <div className="flex-1 pt-8">
            <h1 className="text-xl font-bold text-foreground leading-tight">{novel.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{novel.author}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-foreground">{novel.rating}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${novel.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"}`}>
                {novel.status === "completed" ? "Завершено" : "В процессе"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 mt-4">
        <div className="max-w-screen-lg mx-auto flex gap-3">
          <Link to={`/read/${novel.id}/1`} className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-center font-semibold text-sm hover:opacity-90 transition-opacity">
            Начать чтение
          </Link>
          <button onClick={() => setActiveTab("comments")} className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{novelComments.length}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex gap-1 bg-secondary/50 rounded-2xl p-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  activeTab === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && <span className="ml-1 text-xs opacity-70">({tab.count})</span>}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "info" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{novel.chaptersCount} глав</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{novel.lastUpdated}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {novel.genres.map((genre) => (
                  <span key={genre} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{genre}</span>
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{novel.description}</p>

              {/* Chapter list */}
              <div className="mt-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Список глав</h2>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={chapterSearch}
                    onChange={(e) => { setChapterSearch(e.target.value); setPage(1); }}
                    placeholder="Поиск по номеру или названию..."
                    className="w-full h-10 pl-10 pr-4 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  {paginatedChapters.map((ch) => (
                    <Link key={ch.id} to={`/read/${novel.id}/${ch.number}`} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0">
                      <span className="text-sm text-foreground">{ch.title}</span>
                      <span className="text-xs text-muted-foreground">{ch.addedAt}</span>
                    </Link>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "comments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {/* New comment */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">Вы</span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Написать комментарий..."
                    className="flex-1 h-10 px-4 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comments list */}
              {novelComments.map((c) => (
                <div key={c.id} className="flex gap-3 p-3 bg-card rounded-2xl border border-border">
                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{c.userName}</span>
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{c.text}</p>
                    <button className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.likes}</span>
                    </button>
                  </div>
                </div>
              ))}

              {novelComments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">Комментариев пока нет. Будьте первым!</div>
              )}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {/* Write review */}
              <div className="p-4 bg-card rounded-2xl border border-border space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Написать отзыв</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setNewReviewRating(s)}>
                      <Star className={`w-5 h-5 transition-colors ${s <= newReviewRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="Заголовок отзыва"
                  className="w-full h-10 px-4 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Ваш отзыв..."
                  className="w-full h-24 px-4 py-2 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <button className="w-full py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  Опубликовать отзыв
                </button>
              </div>

              {/* Reviews list */}
              {novelReviews.map((r) => (
                <div key={r.id} className="p-4 bg-card rounded-2xl border border-border">
                  <div className="flex items-start gap-3">
                    <img src={r.avatar} alt="" className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{r.userName}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                      <h4 className="text-sm font-medium text-foreground mt-2">{r.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.text}</p>
                      <button className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{r.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {novelReviews.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">Отзывов пока нет. Напишите первый!</div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NovelInfo;
