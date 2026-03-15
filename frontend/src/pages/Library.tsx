import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import NovelCard from "@/components/NovelCard";
import { novels } from "@/data/mockData";

type Tab = "reading" | "planned" | "completed";

const Library = () => {
  const [activeTab, setActiveTab] = useState<Tab>("reading");

  const tabs: { key: Tab; label: string }[] = [
    { key: "reading", label: "Читаю" },
    { key: "planned", label: "В планах" },
    { key: "completed", label: "Прочитано" },
  ];

  // Mock: distribute novels across tabs
  const tabNovels: Record<Tab, typeof novels> = {
    reading: novels.slice(0, 3),
    planned: novels.slice(3, 5),
    completed: novels.slice(5),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 md:pt-20 px-4 pt-8"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Моя библиотека</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-full p-1 mb-6">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabNovels[activeTab].length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {tabNovels[activeTab].map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Пока пусто</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Library;
