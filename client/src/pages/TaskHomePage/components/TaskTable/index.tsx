"use client";
import React, { useMemo, useState } from "react";
import {
    MoreHorizontal,
    Flag,
    CheckCircle2,
    Circle,
    Clock,
    LayoutList,
    Activity,
    AlertCircle,
    CalendarDays,
    Pencil,
    FolderInput,
    Trash2,
    CircleDashed,
    Loader2,
} from "lucide-react";
import { differenceInCalendarDays, format, isPast, isToday, parseISO, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskTableProps {
    tasks: Task[];
    totalCount: number;
    isLoading: boolean;
    isFetchingMore: boolean;
    onReachEnd: () => void;
    handleSelectTask: (task: Task) => void;
    handleDeleteTask: (task: Task) => void;
    handleDeleteBulk: (ids: number[]) => void;
}

const statusMeta: Record<TaskStatus, { label: string; icon: React.ReactNode; className: string }> = {
    pending: {
        label: "Não iniciada",
        icon: <Circle className="h-5 w-5 text-muted-foreground/50 transition-colors" />,
        className: "bg-amber-500/10 text-amber-500",
    },
    in_progress: {
        label: "Em progresso",
        icon: <CircleDashed className="h-5 w-5 text-blue-500 animate-[spin_3s_linear_infinite] transition-colors" />,
        className: "bg-blue-500/10 text-blue-500",
    },
    completed: {
        label: "Concluída",
        icon: <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10 transition-colors" />,
        className: "bg-green-500/10 text-green-500",
    },
};

const priorityMeta: Record<TaskPriority, { label: string; className: string }> = {
    low: {
        label: "Baixa",
        className: "text-green-500 fill-green-500",
    },
    medium: {
        label: "Média",
        className: "text-amber-500 fill-amber-500",
    },
    high: {
        label: "Alta",
        className: "text-red-500 fill-red-500",
    },
};

export function TaskTable({
    tasks,
    totalCount,
    isLoading,
    isFetchingMore,
    onReachEnd,
    handleSelectTask,
    handleDeleteTask,
    handleDeleteBulk,
}: TaskTableProps) {
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

    const allSelected = useMemo(
        () => tasks.length > 0 && selectedTasks.length === tasks.length,
        [selectedTasks.length, tasks.length],
    );

    const toggleSelectAll = () => {
        setSelectedTasks(allSelected ? [] : tasks.map((task) => task.id));
    };

    const toggleSelectTask = (id: number) => {
        setSelectedTasks((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const onBulkDeleteClick = () => {
        handleDeleteBulk(selectedTasks);
        setSelectedTasks([]);
    };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

        if (distanceToBottom < 120) {
            onReachEnd();
        }
    };

    const getRemainingLabel = (task: Task) => {
        if (task.completed_at) {
            return "Finalizada";
        }

        const dueDate = parseISO(task.due_date);
        const daysLeft = differenceInCalendarDays(startOfDay(dueDate), startOfDay(new Date()));

        if (isToday(dueDate)) {
            return "Hoje";
        }

        if (daysLeft < 0) {
            return `${Math.abs(daysLeft)} dia(s) atrasada`;
        }

        return `${daysLeft} dia(s)`;
    };

    const getRemainingClassName = (task: Task) => {
        if (task.completed_at) {
            return "text-green-500 bg-green-500/10";
        }

        const dueDate = parseISO(task.due_date);
        if (isToday(dueDate) || isPast(startOfDay(dueDate))) {
            return "text-red-500 bg-red-500/10";
        }

        return "text-muted-foreground bg-muted";
    };

    if (isLoading && tasks.length === 0) {
        return (
            <div className="flex h-[420px] items-center justify-center rounded-xl bg-card">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Carregando tarefas...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-xl bg-card shadow-sm">
            <ScrollArea className="h-[400px] w-full rounded-xl border-none" onScroll={handleScroll}>
                <div className="flex h-14 items-center justify-between border-b border-border/40 px-4 py-2">
                    {selectedTasks.length > 0 ? (
                        <Button
                            variant="ghost"
                            onClick={onBulkDeleteClick}
                            className="gap-2 cursor-pointer rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all animate-in fade-in slide-in-from-left-4"
                        >
                            <Trash2 className="h-4 w-4" />
                            Excluir selecionados ({selectedTasks.length})
                        </Button>
                    ) : (
                        <span className="ml-2 text-sm text-muted-foreground">
                            {tasks.length} de {totalCount} tarefas carregadas
                        </span>
                    )}

                    {isFetchingMore && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando mais...
                        </div>
                    )}
                </div>

                <Table className="border-collapse">
                    <TableHeader className="sticky top-0 z-10 bg-muted/60 backdrop-blur-md">
                        <TableRow className="border-b border-border/50 hover:bg-transparent">
                            <TableHead className="w-[50px] pl-6">
                                <TooltipProvider>
                                    <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center">
                                                <Checkbox
                                                    checked={allSelected}
                                                    onCheckedChange={toggleSelectAll}
                                                    className="translate-y-[2px] cursor-pointer border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="center" className="bg-foreground text-xs font-medium text-background">
                                            Selecionar tarefas visíveis
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableHead>

                            <TableHead className="py-4 font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                    <LayoutList className="h-4 w-4 text-primary" />
                                    Título
                                </div>
                            </TableHead>

                            <TableHead className="hidden font-bold text-foreground md:table-cell">
                                <div className="flex items-center justify-center gap-2">
                                    <Activity className="h-4 w-4 text-primary" />
                                    Status
                                </div>
                            </TableHead>

                            <TableHead className="hidden font-bold text-foreground sm:table-cell">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-primary" />
                                    Prioridade
                                </div>
                            </TableHead>

                            <TableHead className="hidden font-bold text-foreground lg:table-cell">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    Prazo
                                </div>
                            </TableHead>

                            <TableHead className="hidden pr-6 text-right font-bold text-foreground xl:table-cell">
                                <div className="flex items-center justify-end gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    Restante
                                    y               </div>
                            </TableHead>

                            <TableHead className="w-[60px] pr-6" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={7} className="h-[320px] text-center">
                                    <div className="flex animate-in zoom-in flex-col items-center justify-center gap-3 fade-in duration-300">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
                                            <LayoutList className="h-10 w-10 text-muted-foreground/40" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-medium text-foreground">
                                                Nenhuma tarefa encontrada
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Ajuste os filtros ou crie uma nova tarefa para começar.
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            tasks.map((task) => {
                                const dueDate = parseISO(task.due_date);
                                const status = statusMeta[task.status];
                                const priority = priorityMeta[task.priority];

                                return (
                                    <TableRow
                                        key={task.id}
                                        className={cn(
                                            "group border-b border-border/40 transition-all hover:bg-muted/30",
                                            selectedTasks.includes(task.id) && "bg-primary/5 hover:bg-primary/10",
                                        )}
                                    >
                                        <TableCell className="pl-6">
                                            <TooltipProvider>
                                                <Tooltip delayDuration={500}>
                                                    <TooltipTrigger asChild>
                                                        <Checkbox
                                                            checked={selectedTasks.includes(task.id)}
                                                            onCheckedChange={() => toggleSelectTask(task.id)}
                                                            aria-label={`Selecionar tarefa: ${task.title}`}
                                                            className="cursor-pointer"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right" className="border-none bg-primary text-[10px] font-semibold text-primary-foreground">
                                                        Selecionar
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>

                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <button type="button" className="cursor-default focus:outline-none">
                                                    {status.icon}
                                                </button>
                                                <div className="flex flex-col">
                                                    <span
                                                        className={cn(
                                                            "text-sm font-medium transition-all lg:text-base",
                                                            task.completed_at && "text-muted-foreground line-through opacity-60",
                                                        )}
                                                    >
                                                        {task.title}
                                                    </span>
                                                    {task.description ? (
                                                        <span className="max-w-[420px] truncate text-xs text-muted-foreground">
                                                            {task.description}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden text-center md:table-cell">
                                            <Badge variant="outline" className={cn("rounded-lg border-none px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider", status.className)}>
                                                {status.label}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <div className="w-fit rounded-full border border-border/50 bg-muted/40 px-3 py-1">
                                                <div className="flex items-center gap-2">
                                                    <Flag className={cn("h-3.5 w-3.5", priority.className)} />
                                                    <span className="text-xs font-medium">{priority.label}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm text-muted-foreground">
                                                {format(dueDate, "dd 'de' MMM yyyy", { locale: ptBR })}
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden pr-6 text-right xl:table-cell">
                                            <span className={cn("rounded-md px-2 py-1 text-xs font-bold", getRemainingClassName(task))}>
                                                {getRemainingLabel(task)}
                                            </span>
                                        </TableCell>

                                        <TableCell className="pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:bg-accent"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/50 p-2 shadow-xl">
                                                    <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold uppercase text-muted-foreground">
                                                        Opções
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator className="opacity-50" />

                                                    <DropdownMenuItem
                                                        className="cursor-pointer gap-2 rounded-md py-2"
                                                        onSelect={() => handleSelectTask(task)}
                                                    >
                                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                                        <span>Editar</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="cursor-pointer gap-2 rounded-md py-2">
                                                        <FolderInput className="h-4 w-4 text-muted-foreground" />
                                                        <span>Mover para...</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator className="opacity-50" />

                                                    <DropdownMenuItem
                                                        className="cursor-pointer gap-2 rounded-md py-2 font-medium text-red-500 focus:bg-red-500/10 focus:text-red-500"
                                                        onSelect={() => handleDeleteTask(task)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span>Excluir</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}