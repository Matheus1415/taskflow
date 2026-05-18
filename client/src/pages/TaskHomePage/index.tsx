"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    Circle,
    CircleDashed,
    ListTodo,
    Trash2,
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
import { toast } from "@/utils/notifications";

const PER_PAGE = 50;
type TaskViewStatus = TaskStatus | "deleted";

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
    const [activeStatus, setActiveStatus] = useState<TaskViewStatus>("in_progress");
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

    const { taskDelete, taskEdit, taskRestore } = useTaskCrud();

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
            const uniqueNewTasks = tasks.filter((task) => !previousIds.has(task.id));
            if (uniqueNewTasks.length === 0) {
                return previous;
            }

            return [...previous, ...uniqueNewTasks];
        });
    }, [page, tasks]);

    const visibleTasks = useMemo(() => {
        const filteredByStatus = activeStatus === "deleted"
            ? loadedTasks.filter((task) => task.deleted_at !== null)
            : loadedTasks
                .filter((task) => task.deleted_at === null)
                .filter((task) => task.status === activeStatus);

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
            title: task.deleted_at ? "Excluir em definitivo?" : "Mover tarefa para a lixeira?",
            text: task.deleted_at
                ? `A tarefa ${task.title} sera removida permanentemente.`
                : `Tem certeza que deseja enviar a tarefa ${task.title} para a lixeira?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#06b6d4",
            cancelButtonColor: "#171717",
            confirmButtonText: task.deleted_at ? "Sim, excluir" : "Sim, mover",
            background: "#0a0a0a",
            color: "#fff",
            customClass: {
                popup: "border border-white/10 rounded-3xl",
            },
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            await taskDelete(task.id);

            setLoadedTasks((previous) => {
                if (task.deleted_at) {
                    return previous.filter((currentTask) => currentTask.id !== task.id);
                }

                return previous.map((currentTask) => (
                    currentTask.id === task.id
                        ? { ...currentTask, deleted_at: new Date().toISOString() }
                        : currentTask
                ));
            });

            Swal.fire({
                title: task.deleted_at ? "Excluida!" : "Movida para a lixeira!",
                text: task.deleted_at
                    ? "A tarefa foi removida permanentemente."
                    : "A tarefa foi enviada para a lixeira.",
                icon: "success",
                background: "#0a0a0a",
                color: "#fff",
            });
        });
    };

    const handleDeleteBulk = async (ids: number[]) => {
        const selectedTasks = loadedTasks.filter((task) => ids.includes(task.id));
        const hasTrashedTasks = selectedTasks.some((task) => task.deleted_at !== null);

        const taskTitles = selectedTasks.map(t => t.title).join(", ");

        const result = await Swal.fire({
            title: hasTrashedTasks ? "Excluir tarefas em definitivo?" : "Mover tarefas para a lixeira?",
            text: hasTrashedTasks
                ? `${ids.length} tarefa(s) serão removidas permanentemente.`
                : `${ids.length} tarefa(s) serão enviadas para a lixeira.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#06b6d4",
            cancelButtonColor: "#171717",
            confirmButtonText: hasTrashedTasks ? "Sim, excluir" : "Sim, mover",
            background: "#0a0a0a",
            color: "#fff",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await Promise.all(ids.map((id) => taskDelete(id)));

            setLoadedTasks((previous) => {
                if (hasTrashedTasks) {
                    return previous.filter((task) => !ids.includes(task.id));
                }

                return previous.map((task) => (
                    ids.includes(task.id)
                        ? { ...task, deleted_at: new Date().toISOString() }
                        : task
                ));
            });

            if (hasTrashedTasks) {
                toast.success(`Tarefa(s) ${taskTitles} excluída(s) permanentemente!`);
            } else {
                toast.success(`Tarefa(s) ${taskTitles} enviada(s) para a lixeira!`);
            }

        } catch (error) {
            toast.error("Ocorreu um erro ao tentar excluir as tarefas.");
        }
    };

    const handleStatusBulkUpdate = async (ids: number[], status: TaskStatus) => {
        try {
            const updatedTaskTitles = loadedTasks
                .filter(task => ids.includes(task.id))
                .map(task => task.title);

            await Promise.all(ids.map((id) => taskEdit(id, { status })));

            setLoadedTasks((previous) => previous.map((task) => {
                if (!ids.includes(task.id)) {
                    return task;
                }

                return {
                    ...task,
                    status,
                    completed_at: status === "done" ? new Date().toISOString() : null,
                };
            }));

            const taskListString = updatedTaskTitles.join(", ");
            const actionLabel = status === "done" ? "concluída(s)" : "atualizada(s)";

            toast.success(`Tarefa(s) ${taskListString} marcada(s) como ${actionLabel}!`);

        } catch (error) {
            toast.error("Erro ao atualizar tarefas em lote.");
        }
    };

    const handleRestoreTask = async (task: Task) => {
        try {
            await taskRestore(task.id);

            setLoadedTasks((previous) => previous.map((currentTask) => (
                currentTask.id === task.id
                    ? { ...currentTask, deleted_at: null }
                    : currentTask
            )));

            toast.success(`Tarefa "${task.title}" restaurada com sucesso!`);
        } catch (error) {
            toast.error("Erro ao restaurar a tarefa.");
        }
    };

    const handleRestoreBulk = async (ids: number[]) => {
        try {
            const restoredTitles = loadedTasks
                .filter((task) => ids.includes(task.id))
                .map((task) => task.title)
                .join(", ");

            await Promise.all(ids.map((id) => taskRestore(id)));

            setLoadedTasks((previous) => previous.map((task) => (
                ids.includes(task.id)
                    ? { ...task, deleted_at: null }
                    : task
            )));

            toast.success(`Tarefa(s) ${restoredTitles} restaurada(s) com sucesso!`);

        } catch (error) {
            toast.error("Erro ao restaurar as tarefas selecionadas.");
        }
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
        <div id="taskflow-page" className="flex min-h-[730px] flex-col gap-8">
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
                id="task-status-tabs"
                value={activeStatus}
                onValueChange={(value) => setActiveStatus(value as TaskViewStatus)}
                className="w-full space-y-6"
            >
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                    <TabsList id="task-tabs-list" className="h-auto rounded-xl border border-border/50 bg-muted/50 p-1">
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

                        <TabsTrigger
                            value="deleted"
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-rose-500/80 transition-all data-[state=active]:bg-rose-500/10 data-[state=active]:text-rose-500 data-[state=active]:shadow-sm"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Lixeira</span>
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
                handleStatusBulkUpdate={handleStatusBulkUpdate}
                handleRestoreTask={handleRestoreTask}
                handleRestoreBulk={handleRestoreBulk}
                activeStatus={activeStatus}
            />

            <TaskCreateModal open={isOpenDetails} onOpenChange={setOpenCreateModal} />

            {selectedTask && isOpenEditModal ? (
                <TaskEditModal open={isOpenEditModal} onOpenChange={setOpenEditModal} task={selectedTask} />
            ) : null}
        </div>
    );
}
