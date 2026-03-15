import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Heart, BookOpen, X } from "lucide-react";
import { collections, novels } from "@/data/mockData";

const Collections = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [myCollections, setMyCollections] = useState(collections);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newCol = {
      id: `col-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      novelIds: [],
      author: "Вы",
      likes: 0,
    };
    setMyCollections([newCol, ...myCollections]);
    setNewTitle("");
    setNewDesc("");
    setShowCreate(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-20 md:pt-20">
      <div className="px-4 pt-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Коллекции</h1>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              Создать
            </button>
          </div>

          {/* Create modal */}
          {showCreate && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-card rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Новая коллекция</h3>
                <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Название коллекции"
                className="w-full h-10 px-4 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-2"
              />
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Описание (необязательно)"
                className="w-full h-20 px-4 py-2 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-3"
              />
              <button onClick={handleCreate} className="w-full py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Создать коллекцию
              </button>
            </motion.div>
          )}

          {/* Collection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myCollections.map((col) => {
              const colNovels = novels.filter((n) => col.novelIds.includes(n.id));
              return (
                <motion.div key={col.id} whileHover={{ scale: 1.02 }} className="bg-card rounded-2xl border border-border overflow-hidden group">
                  <div className="relative h-32 overflow-hidden">
                    <img src={col.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-sm font-bold text-foreground">{col.title}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{col.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{colNovels.length} новелл</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{col.likes}</span>
                      </div>
                    </div>
                    {/* Mini covers */}
                    {colNovels.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {colNovels.slice(0, 4).map((n) => (
                          <Link key={n.id} to={`/novel/${n.id}`}>
                            <img src={n.cover} alt={n.title} className="w-10 h-14 rounded-lg object-cover" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Collections;
