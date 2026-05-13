"use client";

import { useState } from "react";
import {
    Plus,
    LayoutList,
    Calendar as CalendarIcon,
    Flag,
    CheckCircle2
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface TaskCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskCreateModal({ open, onOpenChange }: TaskCreateModalProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Plus className="h-4 w-4" />
                    Nova Tarefa
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] rounded-3xl border-border/50 bg-card/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        Criar Tarefa
                    </DialogTitle>
                </DialogHeader>

                <form className="grid gap-6 py-4">
                    {/* Título */}
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-semibold ml-1">
                            O que precisa ser feito?
                        </Label>
                        <Input
                            id="title"
                            placeholder="Ex: Finalizar integração de pagamentos"
                            className="rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary/30"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Prioridade */}
                        <div className="grid gap-2">
                            <Label htmlFor="priority" className="text-sm font-semibold ml-1 text-muted-foreground">
                                Prioridade
                            </Label>
                            <Select defaultValue="baixa">
                                <SelectTrigger id="priority" className="rounded-xl border-border/50 bg-background/50">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    <SelectItem value="baixa" className="focus:bg-green-500/10 focus:text-green-500">Baixa</SelectItem>
                                    <SelectItem value="media" className="focus:bg-amber-500/10 focus:text-amber-500">Média</SelectItem>
                                    <SelectItem value="alta" className="focus:bg-red-500/10 focus:text-red-500">Alta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Categoria baseada no seu Schema */}
                        <div className="grid gap-2">
                            <Label htmlFor="category" className="text-sm font-semibold ml-1 text-muted-foreground">
                                Categoria
                            </Label>
                            <Select defaultValue="Gestão">
                                <SelectTrigger id="category" className="rounded-xl border-border/50 bg-background/50">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    <SelectItem value="Gestão">Gestão</SelectItem>
                                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                                    <SelectItem value="Fiscal">Fiscal</SelectItem>
                                    <SelectItem value="Segurança">Segurança</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Prazo */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-semibold ml-1 text-muted-foreground">Prazo final</Label>
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full justify-start text-left font-normal rounded-xl border-border/50 bg-background/50 hover:bg-accent"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                            <span>Selecione uma data</span>
                        </Button>
                    </div>
                </form>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="ghost"
                        onClick={() => setOpen(false)}
                        className="rounded-xl hover:bg-red-500/5 hover:text-red-500"
                    >
                        Cancelar
                    </Button>
                    <Button className="rounded-xl px-8 shadow-md shadow-primary/10">
                        Salvar Tarefa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}