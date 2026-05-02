import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flame,
  Layers,
  MessageCircleMore,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import NovelCard from "@/components/NovelCard";
import { collections, latestUpdates, novels, reviews } from "@/data/mockData";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNovels = useMemo(() => {
    if (!searchQuery) return novels;

    return novels.filter((novel) =>
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const featuredNovel = filteredNovels[0] ?? novels[0];
  const spotlightReviews = reviews.slice(0, 3);
  const editorialCollections = collections.slice(0, 3);
  const heroStats = [
    { label: "novels", value: "12k+" },
    { label: "daily readers", value: "48k" },
    { label: "fresh chapters", value: "320" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-24 md:pb-16 md:pt-24"
    >
      <section className="px-4 pt-6 md:pt-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="paper-panel relative overflow-hidden rounded-[2rem] border border-white/60 px-6 py-8 sm:px-8 sm:py-10"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/55 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 text-sm text-foreground/62">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#132332] text-primary shadow-[0_14px_32px_rgba(16,27,38,0.22)]">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-foreground/45">
                    Literary discovery
                  </p>
                  <p className="mt-1 font-medium text-foreground/70">
                    Handpicked web novels with new chapters every day
                  </p>
                </div>
              </div>

              <div className="mt-8 max-w-2xl">
                <h1 className="novel-text-serif text-5xl font-semibold leading-[0.92] text-foreground sm:text-6xl">
                  Read deeper.
                  <br />
                  Find the next world
                  <br />
                  worth disappearing into.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  A more curated home for translated web novels: sharp discovery,
                  beautiful reading rhythm, and living collections built for binge sessions.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <label className="flex h-14 flex-1 items-center gap-3 rounded-full border border-[#d9c9b6] bg-white/70 px-5 shadow-[0_10px_30px_rgba(117,95,72,0.08)] backdrop-blur-sm">
                  <Search className="h-[18px] w-[18px] text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by title, mood, or genre"
                    className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/80"
                  />
                </label>

                <Link
                  to="/catalog"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#132332] px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Explore catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.4rem] border border-white/60 bg-white/45 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="ink-panel relative overflow-hidden rounded-[2rem] border border-white/10 p-5 text-white"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/18 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                    Featured tonight
                  </p>
                  <h2 className="mt-3 max-w-xs text-2xl font-semibold leading-tight text-white">
                    {featuredNovel.title}
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/72">
                  {featuredNovel.status === "completed" ? "Completed" : "Updating"}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-[164px_1fr] lg:grid-cols-1 xl:grid-cols-[164px_1fr]">
                <img
                  src={featuredNovel.cover}
                  alt={featuredNovel.title}
                  className="aspect-[4/5] w-full rounded-[1.6rem] object-cover shadow-[0_22px_50px_rgba(5,10,17,0.34)]"
                />

                <div className="flex flex-col">
                  <p className="text-sm leading-7 text-white/72">
                    {featuredNovel.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredNovel.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/76"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/6 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Rating</p>
                      <p className="mt-2 flex items-center gap-1 text-lg font-semibold text-white">
                        <Star className="h-4 w-4 fill-[#f5c66b] text-[#f5c66b]" />
                        {featuredNovel.rating.toFixed(1)}
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/6 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Latest</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Ch. {featuredNovel.latestChapter}
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/6 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Updated</p>
                      <p className="mt-2 text-sm font-medium text-white/82">
                        {featuredNovel.lastUpdated}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/novel/${featuredNovel.id}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white text-sm font-medium text-[#112131] px-5 py-3 transition-transform hover:-translate-y-0.5"
                  >
                    Open novel page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="paper-panel rounded-[2rem] border border-white/60 p-5 sm:p-6"
          >
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Weekly heat
                </p>
                <h2 className="novel-text-serif mt-2 text-3xl font-semibold text-foreground">
                  Trending now
                </h2>
              </div>
              <Link to="/catalog" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {filteredNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} size="sm" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid gap-6"
          >
            <article className="rounded-[2rem] border border-white/10 bg-[#162331] p-5 text-white shadow-[0_22px_48px_rgba(14,20,28,0.24)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-white/45">
                    Editorial signal
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Fresh reviews</h2>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {spotlightReviews.map((review) => (
                  <Link
                    key={review.id}
                    to={`/novel/${review.novelId}`}
                    className="block rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{review.userName}</p>
                          <p className="text-xs text-white/55">{review.date}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-xs text-white/80">
                        <Star className="h-3.5 w-3.5 fill-[#f5c66b] text-[#f5c66b]" />
                        {review.rating}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">{review.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/68">
                      {review.text}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="paper-panel rounded-[2rem] border border-white/60 p-5 sm:p-6"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Human-made shelves
                </p>
                <h2 className="novel-text-serif mt-2 text-3xl font-semibold text-foreground">
                  Curated collections
                </h2>
              </div>
              <Link to="/collections" className="text-sm text-primary hover:underline">
                Browse
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {editorialCollections.map((collection) => (
                <Link
                  key={collection.id}
                  to="/collections"
                  className="group grid gap-4 rounded-[1.7rem] border border-[#dac9b4] bg-white/60 p-4 transition-transform hover:-translate-y-1 sm:grid-cols-[148px_1fr]"
                >
                  <img
                    src={collection.cover}
                    alt={collection.title}
                    className="h-32 w-full rounded-[1.3rem] object-cover sm:h-full"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        <Layers className="h-3.5 w-3.5" />
                        {collection.author}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-foreground">
                        {collection.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {collection.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-foreground/72">
                      <span>{collection.novelIds.length} novels inside</span>
                      <span className="inline-flex items-center gap-2 text-primary">
                        Open collection
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-[2rem] border border-white/10 bg-[#162331] p-5 text-white shadow-[0_22px_48px_rgba(14,20,28,0.24)] sm:p-6"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-white/45">
                  Tonight's queue
                </p>
                <h2 className="novel-text-serif mt-2 text-3xl font-semibold text-white">
                  Latest chapter drops
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/60">
                Updated live
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {latestUpdates.map((update, index) => (
                <Link
                  key={`${update.novelId}-${index}`}
                  to={`/novel/${update.novelId}`}
                  className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4 transition-colors hover:bg-white/[0.07]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/42">
                      <Flame className="h-3.5 w-3.5" />
                      New chapter
                    </div>
                    <p className="mt-2 truncate text-base font-semibold text-white">
                      {update.title}
                    </p>
                    <p className="mt-1 text-sm text-white/62">Chapter {update.chapter}</p>
                  </div>
                  <span className="whitespace-nowrap text-sm text-white/55">{update.time}</span>
                </Link>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      <section className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46 }}
          className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[2rem] border border-white/60 bg-white/40 px-6 py-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
              Reader ritual
            </p>
            <h2 className="novel-text-serif mt-2 text-3xl font-semibold text-foreground">
              Keep one shelf for comfort reads and another for chaos.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Build personal collections, follow translators, and return exactly where the story
              pulled hardest.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/library"
              className="inline-flex items-center gap-2 rounded-full bg-[#132332] px-5 py-3 text-sm font-medium text-white"
            >
              <BookOpen className="h-4 w-4" />
              Open library
            </Link>
            <Link
              to="/requests"
              className="inline-flex items-center gap-2 rounded-full border border-[#d6c4ae] bg-white/70 px-5 py-3 text-sm font-medium text-foreground"
            >
              <MessageCircleMore className="h-4 w-4" />
              Suggest a title
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default Home;
