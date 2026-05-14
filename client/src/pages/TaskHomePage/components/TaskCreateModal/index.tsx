"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskForm } from "../TaskForm";
import { taskSchema, type TaskFormValues } from "./schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/utils/notifications";
import { useTaskCrud } from "@/http/request/task/useTaskCrud";

interface TaskCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskCreateModal({ open, onOpenChange }: TaskCreateModalProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "pending",
            priority: "low",
            due_date: new Date(),
        },
    });

    const { taskCreate } = useTaskCrud();

    async function handleCreateTask(data: TaskFormValues) {
        onOpenChange(false);
        form.reset();
        try {
            await taskCreate(data);
            toast.success("Tarefa criada com sucesso!");
            form.reset();
            form.clearErrors();
            onOpenChange(false);
        } catch (error: any) {
            if (error && error.success === false) {
                toast.error("Ops!", error.message);
                return;
            }

            toast.error("Erro de Conexão", "Nao foi possivel contatar o servidor.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        Crie sua nova tarefa
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[280px]">
                    <TaskForm form={form} onSubmit={handleCreateTask} id="task-form" />
                </ScrollArea>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onOpenChange(false);
                            form.reset();
                        }}
                        className="rounded-xl hover:bg-red-500/5 hover:text-red-500"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="task-form"
                        className="rounded-xl cursor-pointer px-8 shadow-md shadow-primary/10"
                        onClick={form.handleSubmit(handleCreateTask)}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Criando..." : "Criar Tarefa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
