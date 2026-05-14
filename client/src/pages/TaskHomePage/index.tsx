"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    Circle,
    CircleDashed,
    ListTodo,
} from "lucide-react";
import Swal from "sweetalert2";
import { useBoolean } from "usehooks-ts";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskTable } from "./components/TaskTable";
import TaskToolbar, { type TaskSortOption } from "./components/TaskToolbar";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";
import { TaskCreateModal } from "./components/TaskCreateModal";
import { TaskEditModal } from "./components/TaskEditModal";
import { useTasks } from "@/http/request/task/useTasks";
import { useTaskCrud } from "@/http/request/task/useTaskCrud";

const PER_PAGE = 50;

const priorityWeight: Record<TaskPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
};

function sortTasks(tasks: Task[], sortBy: TaskSortOption) {
    const nextTasks = [...tasks];

    nextTasks.sort((a, b) => {
        if (sortBy === "priority") {
            return priorityWeight[b.priority] - priorityWeight[a.priority];
        }

        if (sortBy === "dueDateAsc") {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        }

        if (sortBy === "dueDateDesc") {
            return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
        }

        if (sortBy === "oldest") {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }

        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return nextTasks;
}

export default function TaskHomePage() {
    const [activeStatus, setActiveStatus] = useState<TaskStatus>("in_progress");
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState<TaskPriority | "all">("all");
    const [sortBy, setSortBy] = useState<TaskSortOption>("newest");
    const [page, setPage] = useState(1);
    const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);
    const { value: isOpenDetails, setValue: setOpenCreateModal } = useBoolean(false);
    const { value: isOpenEditModal, setValue: setOpenEditModal } = useBoolean(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const {
        tasks,
        pagination,
        isLoading,
    } = useTasks({
        search,
        page,
        per_page: PER_PAGE,
    });

    const { taskDelete } = useTaskCrud();

    useEffect(() => {
        setPage((previous) => (previous === 1 ? previous : 1));
        setLoadedTasks((previous) => (previous.length === 0 ? previous : []));
    }, [search]);

    useEffect(() => {
        setLoadedTasks((previous) => {
            if (page === 1) {
                return previous === tasks ? previous : tasks;
            }

            const previousIds = new Set(previous.map((task) => task.id));
            const uniqueNewTasks = tasks
            .filter((task) => !previousIds.has(task.id));
            if (uniqueNewTasks.length === 0) {
                return previous;
            }

            return [...previous, ...uniqueNewTasks];
        });
    }, [page, tasks]);

    const visibleTasks = useMemo(() => {
        const filteredByStatus = loadedTasks.filter((task) => task.status === activeStatus);
        const filteredByPriority = priority === "all"
            ? filteredByStatus
            : filteredByStatus.filter((task) => task.priority === priority);

        return sortTasks(filteredByPriority, sortBy);
    }, [activeStatus, loadedTasks, priority, sortBy]);

    const handleSelectTask = (task: Task) => {
        setSelectedTask(task);
        setOpenEditModal(true);
    };

    const handleDeleteTask = (task: Task) => {
        Swal.fire({
            title: "Remover tarefa?",
            text: `Tem certeza que deseja excluir a tarefa ${task.title}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#06b6d4",
            cancelButtonColor: "#171717",
            confirmButtonText: "Sim, remover",
            background: "#0a0a0a",
            color: "#fff",
            customClass: {
                popup: "border border-white/10 rounded-3xl",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                await taskDelete(task.id);
                setLoadedTasks((previous) => previous.filter((t) => t.id !== task.id));
                Swal.fire({
                    title: "Excluída!",
                    text: "A tarefa foi excluída.",
                    icon: "success",
                    background: "#0a0a0a",
                    color: "#fff",
                });
            }
        });
    };

    const handleDeleteBulk = (ids: number[]) => {
        console.log("IDs para exclusão em massa:", ids);
    };

    const handleReachEnd = () => {
        if (!pagination || isLoading || !pagination.has_more_pages) {
            return;
        }

        const loadedThreshold = pagination.current_page * pagination.per_page;
        if (loadedTasks.length < loadedThreshold) {
            return;
        }

        setPage((previous) => previous + 1);
    };

    return (
        <div className="flex min-h-[730px] flex-col gap-8">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                        <ListTodo className="h-6 w-6" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            Minhas atividades
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Gerencie suas tarefas, acompanhe prioridades e mantenha sua produtividade em dia.
                    </p>
                </div>
            </section>

            <TaskToolbar
                onOpenChange={setOpenCreateModal}
                search={search}
                priority={priority}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onPriorityChange={setPriority}
                onSortChange={setSortBy}
            />

            <Tabs
                value={activeStatus}
                onValueChange={(value) => setActiveStatus(value as TaskStatus)}
                className="w-full space-y-6"
            >
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                    <TabsList className="h-auto rounded-xl border border-border/50 bg-muted/50 p-1">
                        <TabsTrigger
                            value="pending"
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                        >
                            <Circle className="h-4 w-4 text-muted-foreground/60" />
                            <span className="text-sm font-medium">Não iniciadas</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="in_progress"
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-blue-500 data-[state=active]:shadow-sm"
                        >
                            <CircleDashed className="h-4 w-4" />
                            <span className="text-sm font-medium">Em progresso</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="done"
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-green-500 data-[state=active]:shadow-sm"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Concluídas</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="hidden md:block">
                        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                            Total filtrado: {visibleTasks.length} tarefas
                        </span>
                    </div>
                </div>
            </Tabs>

            <TaskTable
                tasks={visibleTasks}
                totalCount={visibleTasks.length}
                isLoading={isLoading}
                isFetchingMore={isLoading && page > 1}
                onReachEnd={handleReachEnd}
                handleSelectTask={handleSelectTask}
                handleDeleteTask={handleDeleteTask}
                handleDeleteBulk={handleDeleteBulk}
            />

            <TaskCreateModal open={isOpenDetails} onOpenChange={setOpenCreateModal} />

            {selectedTask && isOpenEditModal ? (
                <TaskEditModal open={isOpenEditModal} onOpenChange={setOpenEditModal} task={selectedTask} />
            ) : null}
        </div>
    );
}
