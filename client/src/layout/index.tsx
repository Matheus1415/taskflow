"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium, CheckCircle2 } from "lucide-react";
import { Outlet } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LayoutDefault() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    // Container pai fixo na altura da tela (h-screen) e sem scroll nativo (overflow-hidden)
    <div className="relative h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300 overflow-hidden">
      
      {/* Background decorativo fixo atrás de tudo */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header fixo no topo (shrink-0 impede que o flex esmague o header) */}
      <header className="shrink-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/10">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-base font-semibold tracking-tight leading-tight">
                TaskFlow
              </h1>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                Gerenciamento inteligente de tarefas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card/80 transition-all duration-200 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ScrollArea agora ocupa todo o espaço restante (flex-1) */}
      <ScrollArea className="flex-1 w-full h-full">
        <main className="container mx-auto flex w-full flex-col py-6 px-4 md:px-6 lg:py-8">
          <Outlet />
        </main>
      </ScrollArea>
    </div>
  );
}