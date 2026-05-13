import {
    Calendar as CalendarIcon,
    ArrowDown,
    ArrowRight,
    AlertCircle,
    Clock,
    Loader2,
    CheckCircle2,
} from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { TaskFormValues } from "../TaskCreateModal/schema";
import type { UseFormReturn } from "react-hook-form";

interface TaskFormProps {
    form: UseFormReturn<TaskFormValues>;
    onSubmit: (data: TaskFormValues) => void;
}

export function TaskForm({ form, onSubmit }: TaskFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold ml-1">O que precisa ser feito?</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Finalizar integração de pagamentos"
                                    className="rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold ml-1">Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Adicione detalhes sobre a tarefa..."
                                    className="rounded-xl resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold ml-1 text-neutral-400">Prioridade</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full h-11 hover:border-neutral-600 transition-all focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl shadow-xl">
                                        <SelectItem value="Baixa">
                                            <div className="flex items-center gap-2">
                                                <ArrowDown className="h-4 text-green-500" /> Baixa
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Média">
                                            <div className="flex items-center gap-2">
                                                <ArrowRight className="h-4 text-amber-500" /> Média
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Alta">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="h-4 text-red-500" /> Alta
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold ml-1 text-neutral-400">Status Inicial</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full h-11 hover:border-neutral-600 transition-all focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl shadow-xl">
                                        <SelectGroup>
                                            <SelectLabel className="text-neutral-500 text-[10px] uppercase tracking-wider px-2 py-1.5">
                                                Status da Tarefa
                                            </SelectLabel>

                                            <SelectItem
                                                value="Pendente"
                                                className="rounded-md cursor-pointer focus:bg-neutral-800 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-slate-400" />
                                                    <span>Pendente</span>
                                                </div>
                                            </SelectItem>

                                            <SelectItem
                                                value="Em Progresso"
                                                className="rounded-md cursor-pointer focus:bg-blue-500/10 focus:text-blue-400 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 text-blue-500 animate-spin-slow" />
                                                    <span>Em Progresso</span>
                                                </div>
                                            </SelectItem>

                                            <SelectItem
                                                value="Concluída"
                                                className="rounded-md cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-500 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    <span>Concluída</span>
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-semibold ml-1 text-neutral-400">Prazo final</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-between"
                                                )}
                                            >
                                                {field.value ? format(field.value, "dd/MM/yyyy") : "Selecione a data"}
                                                <CalendarIcon className="h-4 w-4 opacity-60" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto border-neutral-700 p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value || undefined}
                                            onSelect={(date) => field.onChange(date)}
                                            locale={ptBR}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </form>
        </Form>
    );
}