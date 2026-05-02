import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Layers3,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { collections, latestUpdates, novels, reviews } from "@/data/mockData";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNovels = useMemo(() => {
    if (!searchQuery.trim()) return novels;

    return novels.filter((novel) =>
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const featuredNovel = filteredNovels[0] ?? novels[0];
  const heroStack = filteredNovels.slice(0, 4);
  const trending = filteredNovels.slice(0, 6);
  const freshReviews = reviews.slice(0, 4);
  const curatedCollections = collections.slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-x-hidden bg-[#0f1c28] pb-24 md:pb-12 md:pt-[86px]"
    >
      <section className="px-1.5 pt-1.5 md:px-2.5 md:pt-2.5">
        <div className="mx-auto w-[calc(100vw-12px)] max-w-none overflow-hidden rounded-[24px] border border-[#c7ab88]/35 bg-[#f4ebdd] shadow-[0_24px_70px_rgba(5,12,20,0.2)] md:w-[calc(100vw-20px)]">
          <div className="grid gap-8 px-5 py-6 md:px-8 md:py-8 xl:grid-cols-[1.08fr_0.92fr] xl:gap-10 xl:px-10 xl:py-10 2xl:grid-cols-[1fr_0.96fr] 2xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="min-w-0"
            >
              <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[0.84fr_1.16fr]">
                <div className="min-w-0">
                  <p className="novel-text-serif text-[2.75rem] font-semibold leading-[0.95] text-[#2f241d] sm:text-5xl xl:text-[4.25rem] 2xl:text-[4.6rem]">
                    Истории,
                    <br />
                    которые остаются
                    <br />
                    с тобой
                  </p>

                  <p className="mt-4 max-w-[36rem] text-sm leading-7 text-[#6f6258] sm:text-base xl:text-[1.02rem]">
                    Тысячи захватывающих новелл в тёплой теме и в том ритме,
                    который хочется читать вечерами.
                  </p>

                  <div className="mt-6 flex max-w-[38rem] flex-col gap-3 sm:flex-row">
                    <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-[#d8c5ad] bg-[#fbf7f1] px-5 shadow-[0_18px_40px_rgba(103,77,48,0.08)]">
                      <Search className="h-4 w-4 text-[#8f8378]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Поиск по названию, жанру или настроению"
                        className="h-full flex-1 bg-transparent text-sm text-[#2f241d] outline-none placeholder:text-[#9d9186]"
                      />
                    </label>

                    <Link
                      to="/catalog"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#122130] px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                    >
                      Искать новеллы
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div
                  className="relative min-h-[268px] overflow-hidden rounded-[24px] border border-[#d6c4af] bg-cover bg-center shadow-[0_20px_50px_rgba(74,53,31,0.16)] xl:min-h-[300px]"
                  style={{ backgroundImage: `url(${featuredNovel.cover})` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,236,222,0.84),rgba(245,236,222,0.22))]" />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f4ebdd] to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-5 xl:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7f6f61]">
                      В центре внимания
                    </p>
                    <h2 className="mt-3 max-w-sm text-2xl font-semibold leading-tight text-[#2f241d]">
                      {featuredNovel.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#6f6258]">{featuredNovel.author}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="min-w-0"
            >
              <div className="relative mx-auto flex min-h-[420px] max-w-[620px] items-end justify-center xl:min-h-[520px] xl:max-w-none">
                {heroStack.slice(1, 4).map((novel, index) => {
                  const offsets = [
                    "right-[10%] top-[8%] z-10 rotate-[10deg]",
                    "right-[2%] top-[16%] z-20 rotate-[5deg]",
                    "right-0 top-[24%] z-30 rotate-[1deg]",
                  ];

                  return (
                    <article
                      key={novel.id}
                      className={`absolute hidden h-[280px] w-[172px] overflow-hidden rounded-[22px] border border-white/10 bg-[#101c28] shadow-[0_22px_54px_rgba(8,16,24,0.22)] lg:block xl:h-[330px] xl:w-[198px] 2xl:h-[360px] 2xl:w-[214px] ${offsets[index]}`}
                    >
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="h-full w-full object-cover opacity-[0.78]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08121c] via-[#08121c]/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <h3 className="line-clamp-2 text-xl font-semibold">{novel.title}</h3>
                        <p className="mt-2 text-sm text-white/72">{novel.author}</p>
                      </div>
                    </article>
                  );
                })}

                <article className="relative z-40 w-full max-w-[390px] overflow-hidden rounded-[26px] border border-black/10 bg-[#102030] text-white shadow-[0_24px_64px_rgba(8,16,24,0.3)] xl:max-w-[408px] 2xl:max-w-[430px]">
                  <div className="aspect-[1.18/1] overflow-hidden">
                    <img
                      src={featuredNovel.cover}
                      alt={featuredNovel.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 p-5 xl:p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                        {featuredNovel.genres[0]}
                      </p>
                      <h2 className="mt-2 text-[1.75rem] font-semibold leading-[1.02] text-white xl:text-[1.95rem]">
                        {featuredNovel.title}
                      </h2>
                      <p className="mt-2 text-sm text-white/62">
                        Том 1. Начало пути
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/72">
                      <span>17+</span>
                      <span>{featuredNovel.chaptersCount} глав</span>
                      <span>{featuredNovel.rating.toFixed(1)}</span>
                    </div>

                    <Link
                      to={`/novel/${featuredNovel.id}`}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[#d79a5b] px-5 text-sm font-medium text-[#25180e] transition-colors hover:bg-[#cb8d4d]"
                    >
                      Читать бесплатно
                    </Link>
                  </div>
                </article>
              </div>
            </motion.aside>
          </div>

          <div className="grid gap-8 border-t border-[#dac9b4] px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-9 2xl:px-12">
            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="novel-text-serif text-3xl font-semibold text-[#2f241d]">
                    В тренде
                  </h2>
                  <p className="mt-1 text-sm text-[#8d7f72]">
                    Самые заметные новеллы недели
                  </p>
                </div>
                <Link to="/catalog" className="text-sm text-[#9b7652] hover:underline">
                  Смотреть все
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {trending.map((novel) => (
                  <Link
                    key={novel.id}
                    to={`/novel/${novel.id}`}
                    className="group overflow-hidden rounded-[20px] border border-[#dfcfbb] bg-[#fbf7f1] shadow-[0_12px_28px_rgba(95,72,47,0.06)] transition-transform hover:-translate-y-1"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-3.5">
                      <h3 className="line-clamp-2 text-base font-semibold leading-tight text-[#2f241d] xl:text-[1.05rem]">
                        {novel.title}
                      </h3>
                      <p className="text-sm text-[#7f7267]">{novel.author}</p>
                      <div className="flex items-center justify-between pt-1 text-sm text-[#8d7f72]">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-[#d79a5b] text-[#d79a5b]" />
                          {novel.rating.toFixed(1)}
                        </span>
                        <span>{novel.chaptersCount} глав</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="novel-text-serif text-3xl font-semibold text-[#2f241d]">
                      Свежие рецензии
                    </h2>
                    <p className="mt-1 text-sm text-[#8d7f72]">
                      Что сейчас обсуждают читатели
                    </p>
                  </div>
                  <Link to="/profile" className="text-sm text-[#9b7652] hover:underline">
                    Читать все
                  </Link>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {freshReviews.map((review) => (
                    <Link
                      key={review.id}
                      to={`/novel/${review.novelId}`}
                      className="rounded-[20px] border border-[#dfcfbb] bg-[#fffaf4] p-4 shadow-[0_12px_28px_rgba(95,72,47,0.05)]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#2f241d]">
                            {review.userName}
                          </p>
                          <p className="text-xs text-[#8d7f72]">{review.date}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-[#d79a5b]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= review.rating ? "fill-current" : "text-[#eadfce]"
                            }`}
                          />
                        ))}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-[#2f241d]">
                        {review.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#6f6258]">
                        {review.text}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="novel-text-serif text-3xl font-semibold text-[#2f241d]">
                      Подборки
                    </h2>
                    <p className="mt-1 text-sm text-[#8d7f72]">
                      Редакционные и авторские списки
                    </p>
                  </div>
                  <Link to="/collections" className="text-sm text-[#9b7652] hover:underline">
                    Смотреть все
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {curatedCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to="/collections"
                      className="group relative min-h-[190px] overflow-hidden rounded-[22px] border border-[#dfcfbb] bg-[#102030] text-white shadow-[0_18px_40px_rgba(21,27,37,0.18)]"
                    >
                      <img
                        src={collection.cover}
                        alt={collection.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08111b] via-[#08111b]/58 to-transparent" />
                      <div className="relative flex h-full flex-col justify-end p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                          {collection.author}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                          {collection.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/72">
                          {collection.novelIds.length} новелл
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="novel-text-serif text-3xl font-semibold text-[#2f241d]">
                    Последние обновления
                  </h2>
                  <p className="mt-1 text-sm text-[#8d7f72]">
                    Новые главы, которые появились сегодня
                  </p>
                </div>
                <Link to="/catalog" className="text-sm text-[#9b7652] hover:underline">
                  Смотреть все
                </Link>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-[#dfcfbb] bg-[#fffaf4] shadow-[0_12px_28px_rgba(95,72,47,0.05)]">
                {latestUpdates.map((update, index) => (
                  <Link
                    key={`${update.novelId}-${index}`}
                    to={`/novel/${update.novelId}`}
                    className="grid items-center gap-4 border-b border-[#ede1d2] px-4 py-3.5 transition-colors hover:bg-[#fbf1e4] md:grid-cols-[1.5fr_0.68fr_130px_112px] last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[#2f241d]">
                        {update.title}
                      </p>
                      <p className="mt-1 text-sm text-[#8d7f72]">Глава {update.chapter}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#8d7f72]">
                      <Flame className="h-4 w-4 text-[#d79a5b]" />
                      Свежий релиз
                    </div>

                    <p className="text-sm text-[#8d7f72]">{update.time}</p>

                    <span className="inline-flex h-10 items-center justify-center rounded-full border border-[#d9c6ae] bg-white px-4 text-sm font-medium text-[#7f5f42]">
                      Читать
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dfcfbb] bg-[linear-gradient(135deg,#132231,#0e1925)] px-6 py-6 text-white md:px-8">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-3xl">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/52">
                    <Sparkles className="h-4 w-4 text-[#d79a5b]" />
                    Reader ritual
                  </p>
                  <h2 className="novel-text-serif mt-3 text-4xl font-semibold leading-tight text-white">
                    Соберите библиотеку, в которую хочется возвращаться каждый вечер.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                    Следите за переводами, сохраняйте любимые арки и держите под рукой
                    подборки под любое настроение.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/library"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#d79a5b] px-5 text-sm font-medium text-[#24170d]"
                  >
                    Открыть библиотеку
                  </Link>
                  <Link
                    to="/collections"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 text-sm font-medium text-white"
                  >
                    <Layers3 className="mr-2 h-4 w-4" />
                    Смотреть подборки
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
