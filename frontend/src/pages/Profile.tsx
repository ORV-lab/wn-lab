import { motion } from "framer-motion";
import { User, LogIn, Moon, Sun, Bell, Shield, HelpCircle } from "lucide-react";

const Profile = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 md:pt-20 px-4 pt-8"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Профиль</h1>
        </div>

        {/* Guest state */}
        <div className="bg-card rounded-2xl border border-border p-6 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-foreground font-semibold mb-1">Гость</p>
          <p className="text-sm text-muted-foreground mb-4">
            Войдите, чтобы синхронизировать прогресс чтения
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            <LogIn className="w-4 h-4" />
            Войти
          </button>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {[
            { icon: Moon, label: "Тёмная тема", action: toggleTheme, toggle: true },
            { icon: Bell, label: "Уведомления", action: () => {} },
            { icon: Shield, label: "Конфиденциальность", action: () => {} },
            { icon: HelpCircle, label: "Помощь", action: () => {} },
          ].map(({ icon: Icon, label, action }, i) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-foreground ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
