"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium, CheckCircle2 } from "lucide-react";
import { Outlet } from "react-router";

export default function LayoutDefault(){
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(currentTheme);

    document.documentElement.classList.toggle(
      "dark",
      currentTheme === "dark"
    );
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    localStorage.setItem("theme", nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/10">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-base font-semibold tracking-tight">
                TaskFlow
              </h1>

              <span className="text-xs text-muted-foreground">
                Gerenciamento inteligente de tarefas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card/80 transition-all duration-200 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <SunMedium className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full flex-1 flex-col py-8">
        <Outlet />
      </main>
    </div>
  );
}
