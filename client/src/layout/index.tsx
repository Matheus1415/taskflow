"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium, CheckCircle2, LogOut, CheckSquare } from "lucide-react";
import { Outlet } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthContext } from "@/contexts/AuthContext/hook";
import { Button } from "@/components/ui/button";

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

  const { actions: { logout } } = useAuthContext();

  return (
    <div className="relative h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300 overflow-hidden">

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <header className="shrink-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 items-center justify-between px-8 backdrop-blur-md border-b">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-105">
              <CheckSquare className="h-6 w-6" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter leading-none uppercase italic">
                Task Flow
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mt-1">
                Gerencie suas tarefas com eficiência
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={logout}
              className="hidden sm:flex cursor-pointer items-center gap-3 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl px-4 py-6 transition-all group border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sair</span>
            </Button>

            <div className="h-8 w-[1px] bg-neutral-800 hidden sm:block" />

            <button
              onClick={toggleTheme}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:text-blue-400 cursor-pointer shadow-xl"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <SunMedium className="h-5 w-5 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 w-full h-full">
        <main className="container mx-auto flex w-full flex-col py-6 px-4 md:px-6 lg:py-8">
          <Outlet />
        </main>
      </ScrollArea>
    </div>
  );
}