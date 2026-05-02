import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenText,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  Layers3,
  LibraryBig,
  Search,
  Settings,
  Star,
  UserRound,
} from "lucide-react";
import { collections, latestUpdates, novels, reviews } from "@/data/mockData";

const librarySections = [
  { label: "Архив", caption: "Литература без границ", icon: Compass, active: true },
  { label: "Избранное", caption: "Сохранённые книги", icon: Bookmark },
  { label: "Читаю", caption: "Продолжить чтение", icon: BookOpenText },
  { label: "Завершено", caption: "Прочитанные циклы", icon: CheckCircle2 },
  { label: "В папках", caption: "Подборки и полки", icon: Layers3 },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNovels = useMemo(() => {
    if (!searchQuery.trim()) return novels;

    return novels.filter((novel) =>
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const featuredNovel = filteredNovels[0] ?? novels[0];
  const popularNovels = filteredNovels.slice(0, 5);
  const shelfNovels = filteredNovels.slice(0, 4);
  const shelfCollections = collections.slice(0, 3);
  const shelfReviews = reviews.slice(0, 2);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-x-hidden bg-[#0d1722] pb-24 md:pb-10 md:pt-[74px]"
    >
      <section className="px-0 md:px-0">
        <div className="grid min-h-[calc(100vh-74px)] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden border-r border-[#1f2d39] bg-[#0f1418] text-white md:flex md:flex-col">
            <div className="border-b border-[#1f2d39] px-6 py-5">
              <p className="novel-text-serif text-[1.7rem] italic tracking-wide text-[#4ea4a0]">
                ARCHIVE.IO
              </p>
            </div>

            <div className="flex-1 px-4 py-4">
              <div className="space-y-2">
                {librarySections.map(({ label, caption, icon: Icon, active }) => (
                  <button
                    key={label}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-none border-l-2 px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-[#3e9f98] bg-[#13262d] text-white"
                        : "border-transparent text-white/56 hover:bg-white/5 hover:text-white/88"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block truncate text-[11px] text-white/38">{caption}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1f2d39] p-4">
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-white/58 transition-colors hover:text-white"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Настройки</span>
              </button>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid min-h-[calc(100vh-74px)] min-w-0 grid-cols-1 border-l-0 border-[#1f2d39] md:grid-cols-[minmax(0,1fr)_350px] xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="min-w-0 border-r-0 border-[#1f2d39] md:border-r">
                <section className="relative min-h-[62vh] overflow-hidden border-b border-[#1f2d39]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredNovel.cover})` }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,23,34,0.22),rgba(13,23,34,0.9))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,18,0.9)_0%,rgba(7,12,18,0.62)_42%,rgba(7,12,18,0.82)_100%)]" />

                  <div className="relative mx-auto flex min-h-[62vh] w-full max-w-none items-center px-6 py-10 md:px-8 xl:px-12">
                    <div className="max-w-[760px]">
                      <p className="text-xs uppercase tracking-[0.32em] text-[#4ea4a0]">
                        Архив историй нового века
                      </p>
                      <h1 className="novel-text-serif mt-6 max-w-[980px] text-5xl font-semibold leading-[1.02] text-white sm:text-6xl xl:text-[4.8rem] 2xl:text-[5.6rem]">
                        Где литература встречается
                        <br />
                        с бесконечностью данных.
                      </h1>
                      <p className="mt-6 max-w-[680px] text-base leading-8 text-white/70 xl:text-lg">
                        Погрузитесь в частный цифровой архив, где передовые алгоритмы и ручная
                        редактура сохраняют дух оригинала. Читайте мировые шедевры на своём языке
                        с беспрецедентной точностью.
                      </p>

                      <div className="mt-8 flex max-w-[540px] flex-col gap-3 sm:flex-row">
                        <Link
                          to={`/novel/${featuredNovel.id}`}
                          className="inline-flex h-12 items-center justify-center bg-[#3a9a94] px-6 text-sm font-medium uppercase tracking-[0.18em] text-[#081116] transition-colors hover:bg-[#4eb0aa]"
                        >
                          Начать чтение
                        </Link>
                        <label className="flex h-12 flex-1 items-center gap-3 border border-white/12 bg-white/6 px-4 text-white/72 backdrop-blur-sm">
                          <Search className="h-4 w-4 text-white/52" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Исследовать каталог"
                            className="h-full flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
                  <section className="border-b border-[#1f2d39] px-6 py-6 md:px-8 xl:border-r xl:px-10">
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <div>
                        <h2 className="novel-text-serif text-3xl font-semibold text-white">
                          Продолжить чтение
                        </h2>
                        <p className="mt-1 text-sm text-white/42">
                          Выборки, в которые хочется вернуться сегодня
                        </p>
                      </div>
                      <Link to="/library" className="text-sm text-[#4ea4a0] hover:underline">
                        В библиотеку
                      </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {shelfNovels.map((novel) => (
                        <Link
                          key={novel.id}
                          to={`/novel/${novel.id}`}
                          className="group overflow-hidden border border-white/10 bg-[#131e29] transition-colors hover:bg-[#172634]"
                        >
                          <div className="grid grid-cols-[112px_minmax(0,1fr)]">
                            <img
                              src={novel.cover}
                              alt={novel.title}
                              className="h-full min-h-[170px] w-full object-cover"
                            />
                            <div className="flex min-w-0 flex-col justify-between p-4">
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-[#4ea4a0]">
                                  {novel.genres[0]}
                                </p>
                                <h3 className="mt-3 line-clamp-3 text-xl font-semibold leading-tight text-white">
                                  {novel.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/52">{novel.author}</p>
                              </div>

                              <div className="mt-4 flex items-center justify-between text-xs text-white/48">
                                <span>{novel.latestChapter} глава</span>
                                <span className="inline-flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-[#d0a360] text-[#d0a360]" />
                                  {novel.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="border-b border-[#1f2d39] px-6 py-6 md:px-8 xl:px-10">
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <div>
                        <h2 className="novel-text-serif text-3xl font-semibold text-white">
                          Подборки
                        </h2>
                        <p className="mt-1 text-sm text-white/42">
                          Редакционные и авторские списки
                        </p>
                      </div>
                      <Link to="/collections" className="text-sm text-[#4ea4a0] hover:underline">
                        Все подборки
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {shelfCollections.map((collection) => (
                        <Link
                          key={collection.id}
                          to="/collections"
                          className="group relative block min-h-[170px] overflow-hidden border border-white/10"
                        >
                          <img
                            src={collection.cover}
                            alt={collection.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,24,0.82),rgba(9,16,24,0.28))]" />
                          <div className="relative flex h-full flex-col justify-end p-5">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[#4ea4a0]">
                              {collection.author}
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                              {collection.title}
                            </h3>
                            <p className="mt-2 max-w-md text-sm text-white/62">
                              {collection.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>

                <section className="px-6 py-6 md:px-8 xl:px-10">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="novel-text-serif text-3xl font-semibold text-white">
                        Последние обновления
                      </h2>
                      <p className="mt-1 text-sm text-white/42">
                        Новые главы и читательские заметки
                      </p>
                    </div>
                    <Link to="/catalog" className="text-sm text-[#4ea4a0] hover:underline">
                      В каталог
                    </Link>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="border border-white/10 bg-[#111a24]">
                      {latestUpdates.map((update, index) => (
                        <Link
                          key={`${update.novelId}-${index}`}
                          to={`/novel/${update.novelId}`}
                          className="grid gap-2 border-b border-white/8 px-5 py-4 transition-colors hover:bg-white/5 md:grid-cols-[minmax(0,1fr)_110px_96px] last:border-b-0"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-white">{update.title}</p>
                            <p className="mt-1 text-sm text-white/46">Глава {update.chapter}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/52">
                            <Clock3 className="h-4 w-4 text-[#4ea4a0]" />
                            {update.time}
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm text-[#4ea4a0]">
                            Открыть
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {shelfReviews.map((review) => (
                        <Link
                          key={review.id}
                          to={`/novel/${review.novelId}`}
                          className="block border border-white/10 bg-[#111a24] p-5 transition-colors hover:bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={review.avatar}
                              alt={review.userName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-white">{review.userName}</p>
                              <p className="text-xs text-white/38">{review.date}</p>
                            </div>
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-white">{review.title}</h3>
                          <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/56">
                            {review.text}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <aside className="hidden min-w-0 bg-[#121a22] md:block">
                <div className="border-b border-[#1f2d39] px-6 py-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="novel-text-serif text-3xl font-semibold text-white">
                        Популярное
                      </p>
                      <p className="mt-1 text-sm text-white/38">
                        Выбор читателей на этой неделе
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/58 hover:text-white"
                    >
                      <UserRound className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-5 px-5 py-5">
                  {popularNovels.map((novel) => (
                    <Link
                      key={novel.id}
                      to={`/novel/${novel.id}`}
                      className="group block overflow-hidden border border-white/10 bg-[#0e161f] transition-colors hover:bg-[#13202d]"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={novel.cover}
                          alt={novel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-3 p-4">
                        <div>
                          <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-white">
                            {novel.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/42">{novel.author}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {novel.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre}
                              className="border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-white/54"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-white/46">
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-[#d0a360] text-[#d0a360]" />
                            {novel.rating.toFixed(1)}
                          </span>
                          <span>{novel.chaptersCount} глав</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
