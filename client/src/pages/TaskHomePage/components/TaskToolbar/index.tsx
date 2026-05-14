"use client";

import {
  ArrowUpDown,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskPriority } from "@/types/task";

export type TaskSortOption = "newest" | "oldest" | "dueDateAsc" | "dueDateDesc" | "priority";

interface TaskToolbarProps {
  onOpenChange: (open: boolean) => void;
  search: string;
  priority: TaskPriority | "all";
  sortBy: TaskSortOption;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: TaskPriority | "all") => void;
  onSortChange: (value: TaskSortOption) => void;
}

export default function TaskToolbar({
  onOpenChange,
  search,
  priority,
  sortBy,
  onSearchChange,
  onPriorityChange,
  onSortChange,
}: TaskToolbarProps) {
  return (
    <div className="flex flex-col gap-3 p-1 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Pesquisar tarefas..."
            className="h-10 pl-9 rounded-xl border-border/50 bg-card/50 shadow-sm transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
          />
        </div>

        <Select value={priority} onValueChange={(value) => onPriorityChange(value as TaskPriority | "all")}>
          <SelectTrigger className="h-10 w-full rounded-xl border-border/50 bg-card shadow-sm lg:w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas prioridades</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => onSortChange(value as TaskSortOption)}>
          <SelectTrigger className="h-10 w-full rounded-xl border-border/50 bg-card shadow-sm lg:w-[210px]">
            <span className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Ordenar por" />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mais recentes</SelectItem>
            <SelectItem value="oldest">Mais antigas</SelectItem>
            <SelectItem value="dueDateAsc">Prazo mais próximo</SelectItem>
            <SelectItem value="dueDateDesc">Prazo mais distante</SelectItem>
            <SelectItem value="priority">Prioridade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="h-10 cursor-pointer rounded-xl px-4 shadow-md shadow-primary/10 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          onClick={() => onOpenChange(true)}
        >
          <Plus className="mr-2 h-4 w-4 stroke-[3px]" />
          <span className="font-semibold">Nova Tarefa</span>
        </Button>
      </div>
    </div>
  );
}
