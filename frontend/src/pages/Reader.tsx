import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ChevronLeft, ChevronRight, X, List, ArrowLeft } from "lucide-react";
import { novels, chapters } from "@/data/mockData";

type ReaderBg = "white" | "sepia" | "dark";
type ReaderFont = "sans" | "serif";
type TranslationVersion = "gemini" | "google" | "original";

const Reader = () => {
  const { novelId, chapterNum } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const novel = novels.find((n) => n.id === novelId);
  const chapterNumber = parseInt(chapterNum || "1");
  const chapter = chapters.find((ch) => ch.number === chapterNumber);

  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [bgMode, setBgMode] = useState<ReaderBg>("dark");
  const [fontFamily, setFontFamily] = useState<ReaderFont>("sans");
  const [translation, setTranslation] = useState<TranslationVersion>("gemini");

  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(progress);

    if (scrollTop > lastScrollY.current + 50) {
      setZenMode(true);
    } else if (scrollTop < lastScrollY.current - 50) {
      setZenMode(false);
    }
    lastScrollY.current = scrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, chapterNumber]);

  if (!novel || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Глава не найдена
      </div>
    );
  }

  const bgClass =
    bgMode === "white"
      ? "reader-bg-white"
      : bgMode === "sepia"
      ? "reader-bg-sepia"
      : "reader-bg-dark";

  const fontClass = fontFamily === "serif" ? "novel-text-serif" : "novel-text-sans";

  const goToChapter = (num: number) => {
    if (num >= 1 && num <= chapters.length) {
      navigate(`/read/${novelId}/${num}`);
    }
  };

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted/20">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Top bar */}
      <AnimatePresence>
        {!zenMode && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/30"
          >
            <div className="flex items-center justify-between h-14 px-4 max-w-screen-md mx-auto">
              <Link
                to={`/novel/${novelId}`}
                className="flex items-center gap-2 text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {novel.title}
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowChapterList(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors text-foreground"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors text-foreground"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation tabs */}
      <div className="pt-16 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="flex gap-1 bg-card/50 rounded-full p-1 mb-6">
            {([
              { key: "gemini", label: "Gemini AI" },
              { key: "google", label: "Google" },
              { key: "original", label: "Оригинал" },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTranslation(key)}
                className={`flex-1 py-2 rounded-full text-xs font-medium transition-all ${
                  translation === key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter content */}
      <div className="px-4 pb-8" ref={contentRef}>
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-xl font-bold mb-6">{chapter.title}</h2>
          <div
            className={`${fontClass} whitespace-pre-line`}
            style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
          >
            {chapter.content}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <AnimatePresence>
        {!zenMode && (
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/30"
          >
            <div className="flex items-center justify-between h-14 px-4 max-w-screen-md mx-auto">
              <button
                onClick={() => goToChapter(chapterNumber - 1)}
                disabled={chapterNumber <= 1}
                className="flex items-center gap-1 text-sm font-medium text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Назад
              </button>
              <span className="text-xs text-muted-foreground">
                Глава {chapterNumber} / {chapters.length}
              </span>
              <button
                onClick={() => goToChapter(chapterNumber + 1)}
                disabled={chapterNumber >= chapters.length}
                className="flex items-center gap-1 text-sm font-medium text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Вперёд
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl border-t border-border p-6 max-w-screen-md mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Настройки</h3>
                <button onClick={() => setShowSettings(false)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Font size */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Размер шрифта: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Line height */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Межстрочный интервал: {lineHeight}
                  </label>
                  <input
                    type="range"
                    min="1.2"
                    max="2.5"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Font family */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Шрифт
                  </label>
                  <div className="flex gap-2">
                    {([
                      { key: "sans", label: "Sans-serif" },
                      { key: "serif", label: "Serif" },
                    ] as const).map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setFontFamily(key)}
                        className={`flex-1 py-2 rounded-2xl text-sm font-medium transition-all ${
                          fontFamily === key
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Фон
                  </label>
                  <div className="flex gap-2">
                    {([
                      { key: "white", label: "Белый", color: "bg-white" },
                      { key: "sepia", label: "Сепия", color: "bg-[hsl(40,33%,96%)]" },
                      { key: "dark", label: "Тёмный", color: "bg-[hsl(222,47%,6%)]" },
                    ] as const).map(({ key, label, color }) => (
                      <button
                        key={key}
                        onClick={() => setBgMode(key)}
                        className={`flex-1 py-2 rounded-2xl text-sm font-medium transition-all border-2 ${
                          bgMode === key
                            ? "border-primary"
                            : "border-transparent"
                        } ${color} ${key === "dark" ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chapter list panel */}
      <AnimatePresence>
        {showChapterList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm"
              onClick={() => setShowChapterList(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card border-l border-border p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Главы</h3>
                <button onClick={() => setShowChapterList(false)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      navigate(`/read/${novelId}/${ch.number}`);
                      setShowChapterList(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-2xl text-sm transition-colors ${
                      ch.number === chapterNumber
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating settings button (zen mode) */}
      {zenMode && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setZenMode(false)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};

export default Reader;
