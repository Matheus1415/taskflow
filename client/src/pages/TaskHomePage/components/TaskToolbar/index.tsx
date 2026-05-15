"use client";

import {
  ArrowUpDown,
  ArrowUpNarrowWide,
  CalendarArrowDown,
  CalendarArrowUp,
  Clock,
  Flag,
  ListFilter,
  Plus,
  Search,
  SortAsc,
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
import BtnTaskTutorial from "@/pages/BtnTaskTutorial";

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
    <div id="task-toolbar" className="flex flex-col gap-3 p-1 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="task-search-filter"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Pesquisar tarefas..."
            className="h-10 pl-9 rounded-xl border-border/50 bg-card/50 shadow-sm transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
          />
        </div>

        <Select value={priority} onValueChange={(value) => onPriorityChange(value as TaskPriority | "all")}>
          <SelectTrigger id="task-priority-filter" className="h-10 w-full rounded-xl border-border/50 bg-card shadow-sm lg:w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-muted-foreground" />
                <span>Todas prioridades</span>
              </div>
            </SelectItem>

            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 fill-red-500 text-red-500" />
                <span>Alta</span>
              </div>
            </SelectItem>

            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>Média</span>
              </div>
            </SelectItem>

            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 fill-blue-500 text-blue-500" />
                <span>Baixa</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => onSortChange(value as TaskSortOption)}>
          <SelectTrigger id="task-sort-filter" className="h-10 w-full rounded-xl border-border/50 bg-card shadow-sm lg:w-[210px]">
            <span className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Ordenar por" />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Mais recentes</span>
              </div>
            </SelectItem>

            <SelectItem value="oldest">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <span>Mais antigas</span>
              </div>
            </SelectItem>

            <SelectItem value="dueDateAsc">
              <div className="flex items-center gap-2">
                <CalendarArrowUp className="h-4 w-4 text-cyan-500" />
                <span>Prazo mais próximo</span>
              </div>
            </SelectItem>

            <SelectItem value="dueDateDesc">
              <div className="flex items-center gap-2">
                <CalendarArrowDown className="h-4 w-4 text-muted-foreground" />
                <span>Prazo mais distante</span>
              </div>
            </SelectItem>

            <SelectItem value="priority">
              <div className="flex items-center gap-2">
                <ArrowUpNarrowWide className="h-4 w-4 text-amber-500" />
                <span>Prioridade</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <BtnTaskTutorial />

        <Button
          id="task-create-button"
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
