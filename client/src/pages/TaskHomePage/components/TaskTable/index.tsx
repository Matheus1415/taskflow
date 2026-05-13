"use client";

import React, { useState } from "react";
import {
    MoreHorizontal,
    Calendar,
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
} from "lucide-react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Task } from "@/types/task";

interface TaskTableProps {
    tasks: Task[];
    handleSelectTask: (task: Task) => void;
    handleDeleteTask: (task: Task) => void;
}

export function TaskTable({ tasks, handleSelectTask, handleDeleteTask }: TaskTableProps) {
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const today = new Date("2026-05-12");

    const toggleSelectAll = () => {
        setSelectedTasks(selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id));
    };

    const toggleSelectTask = (id: string) => {
        setSelectedTasks((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const getDaysRemaining = (date: Date) => {
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="w-full bg-card rounded-xl border-none shadow-sm">
            <ScrollArea className="h-[400px] w-full rounded-xl border-none">
                <Table className="border-collapse">
                    <TableHeader className="bg-muted/60 sticky top-0 z-10 backdrop-blur-md">
                        <TableRow className="hover:bg-transparent border-b border-border/50">
                            <TableHead className="w-[50px] pl-6">
                                <TooltipProvider>
                                    <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center">
                                                <Checkbox
                                                    checked={selectedTasks.length === tasks.length}
                                                    onCheckedChange={toggleSelectAll}
                                                    className="translate-y-[2px] border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="center" className="text-xs font-medium bg-foreground text-background">
                                            Selecionar todas as tarefas
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableHead>
                            <TableHead className="font-bold text-foreground py-4">
                                <div className="flex items-center gap-2">
                                    <LayoutList className="h-4 w-4 text-primary" />
                                    Título
                                </div>
                            </TableHead>
                            <TableHead className="hidden md:table-cell font-bold text-foreground">
                                <div className="flex items-center gap-2 justify-center">
                                    <Activity className="h-4 w-4 text-primary" />
                                    Status
                                </div>
                            </TableHead>
                            <TableHead className="hidden sm:table-cell font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-primary" />
                                    Prioridade
                                </div>
                            </TableHead>
                            <TableHead className="hidden lg:table-cell font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    Prazo
                                </div>
                            </TableHead>
                            <TableHead className="hidden xl:table-cell font-bold text-foreground text-right pr-6">
                                <div className="flex items-center gap-2 justify-end">
                                    <Clock className="h-4 w-4 text-primary" />
                                    Restam
                                </div>
                            </TableHead>
                            <TableHead className="w-[60px] pr-6"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                {/* O colSpan deve ser igual ao número total de colunas na sua tabela (neste caso, 7) */}
                                <TableCell colSpan={7} className="h-[320px] text-center">
                                    <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
                                            <LayoutList className="h-10 w-10 text-muted-foreground/40" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-medium text-foreground">
                                                Ainda não há tarefas por aqui
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Você não possui itens nesta categoria no momento.
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (

                            tasks.map((task) => {
                                const daysLeft = getDaysRemaining(task.dueDate);

                                return (
                                    <TableRow
                                        key={task.id}
                                        className={cn(
                                            "group border-b border-border/40 transition-all hover:bg-muted/30",
                                            selectedTasks.includes(task.id) && "bg-primary/5 hover:bg-primary/10"
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
                                                    <TooltipContent side="right" className="text-[10px] font-semibold bg-primary text-primary-foreground border-none">
                                                        Selecionar
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>

                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <button className="focus:outline-none transition-all active:scale-90">
                                                    {(() => {
                                                        switch (task.status) {
                                                            case "Concluída":
                                                                return (
                                                                    <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10 transition-colors" />
                                                                );
                                                            case "Em Progresso":
                                                                return (
                                                                    <CircleDashed className="h-5 w-5 text-blue-500 animate-[spin_3s_linear_infinite] transition-colors" />
                                                                );
                                                            case "Pendente":
                                                            default:
                                                                return (
                                                                    <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-primary transition-colors" />
                                                                );
                                                        }
                                                    })()}
                                                </button>
                                                <div className="flex flex-col">
                                                    <span className={cn(
                                                        "font-medium text-sm lg:text-base transition-all",
                                                        task.completed && "line-through text-muted-foreground opacity-60"
                                                    )}>
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell text-center">
                                            <Badge variant="outline" className={cn(
                                                "rounded-lg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider border-none",
                                                task.status === "Em Progresso" && "bg-blue-500/10 text-blue-500",
                                                task.status === "Pendente" && "bg-amber-500/10 text-amber-500",
                                                task.status === "Concluída" && "bg-green-500/10 text-green-500"
                                            )}>
                                                {task.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <div className="flex items-center gap-2 bg-muted/40 w-fit px-3 py-1 rounded-full border border-border/50">
                                                <Flag className={cn(
                                                    "h-3.5 w-3.5",
                                                    task.priority === "Alta" && "text-red-500 fill-red-500",
                                                    task.priority === "Média" && "text-amber-500 fill-amber-500",
                                                    task.priority === "Baixa" && "text-green-500 fill-green-500"
                                                )} />
                                                <span className="text-xs font-medium">{task.priority}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm text-muted-foreground">
                                                {task.dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden xl:table-cell text-right pr-6">
                                            <span className={cn(
                                                "text-xs font-bold px-2 py-1 rounded-md",
                                                daysLeft <= 3 && !task.completed ? "text-red-500 bg-red-500/10" : "text-muted-foreground bg-muted"
                                            )}>
                                                {task.completed ? "Finalizado" : daysLeft === 0 ? "Hoje" : `${daysLeft} dias`}
                                            </span>
                                        </TableCell>

                                        <TableCell className="pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-52 rounded-xl p-2 shadow-xl border-border/50">
                                                    <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground px-2 py-1.5">
                                                        Opções
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator className="opacity-50" />

                                                    <DropdownMenuItem className="rounded-md cursor-pointer gap-2 py-2"
                                                        onSelect={() => handleSelectTask(task)}
                                                    >
                                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                                        <span>Editar</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="rounded-md cursor-pointer gap-2 py-2">
                                                        <FolderInput className="h-4 w-4 text-muted-foreground" />
                                                        <span>Mover para...</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator className="opacity-50" />

                                                    <DropdownMenuItem className="rounded-md cursor-pointer gap-2 py-2 text-red-500 focus:text-red-500 focus:bg-red-500/10 font-medium"
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