"use client";

import {
    Circle,
    CircleDashed,
    CheckCircle2,
    ListTodo
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskTable } from "./components/TaskTable";
import TaskToolbar from "./components/TaskToolbar";
import type { Task } from "@/types/task";
import { TaskCreateModal } from "./components/TaskCreateModal";
import { useBoolean } from "usehooks-ts";

export default function TaskHomePage() {
    const tasks: Task[] = [
        { id: "1", title: "Configurar ambiente de produção", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-15"), completed: false },
        { id: "2", title: "Revisão de código - Módulo Financeiro", status: "Pendente", priority: "Média", dueDate: new Date("2026-05-18"), completed: false },
        { id: "3", title: "Atualizar documentação da API", status: "Pendente", priority: "Baixa", dueDate: new Date("2026-05-12"), completed: false },
        { id: "4", title: "Implementar Webhooks do WhatsApp", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-25"), completed: false },
        { id: "5", title: "Implementar Webhooks do WhatsApp", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-25"), completed: false },
        { id: "6", title: "Implementar Webhooks do WhatsApp", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-25"), completed: false },
        { id: "7", title: "Implementar Webhooks do WhatsApp", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-25"), completed: false },
        { id: "8", title: "Implementar Webhooks do WhatsApp", status: "Em Progresso", priority: "Alta", dueDate: new Date("2026-05-25"), completed: false },
    ];

    const taskInProgress = tasks.filter(task => task.status === "Em Progresso");
    const taskPending = tasks.filter(task => task.status === "Pendente");
    const taskCompleted = tasks.filter(task => task.status === "Concluída");

    const { value: isOpenDetails, setValue: setOpenCreateModal } = useBoolean(false);

    return (
        <div className="flex flex-col gap-8 min-h-[730px]">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                        <ListTodo className="h-6 w-6" />
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Minhas Tarefas
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Gerencie suas tarefas, acompanhe prioridades e mantenha sua produtividade em dia.
                    </p>
                </div>
            </section>

            <TaskToolbar onOpenChange={setOpenCreateModal}/>

            <Tabs defaultValue="in-progress" className="w-full space-y-6">
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                    <TabsList className="h-auto p-1 bg-muted/50 rounded-xl border border-border/50">
                        <TabsTrigger
                            value="nao-iniciadas"
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                        >
                            <Circle className="h-4 w-4 text-muted-foreground/60" />
                            <span className="font-medium text-sm">Não Iniciadas</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="in-progress"
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-blue-500 data-[state=active]:shadow-sm transition-all"
                        >
                            <CircleDashed className="h-4 w-4" />
                            <span className="font-medium text-sm">Pendentes</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="concluidas"
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-green-500 data-[state=active]:shadow-sm transition-all"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="font-medium text-sm">Concluídas</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="hidden md:block">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            Total: 4 tarefas
                        </span>
                    </div>
                </div>

                <TabsContent value="nao-iniciadas" className="mt-0 border-none outline-none">
                    <TaskTable tasks={taskPending} />
                </TabsContent>

                <TabsContent value="in-progress" className="mt-0 border-none outline-none">
                    <TaskTable tasks={taskInProgress} />
                </TabsContent>

                <TabsContent value="concluidas" className="mt-0 border-none outline-none">
                    <TaskTable tasks={taskCompleted} />
                </TabsContent>
            </Tabs>

            <TaskCreateModal open={isOpenDetails} onOpenChange={setOpenCreateModal} />
        </div>
    );
}