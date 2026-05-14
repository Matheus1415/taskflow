import {
  Calendar as CalendarIcon,
  ArrowDown,
  ArrowRight,
  AlertCircle,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { cn } from "@/utils/utils";
interface TaskFormProps {
  form: UseFormReturn<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  id?: string;
}

export function TaskForm({ form, onSubmit, id }: TaskFormProps) {
  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 font-semibold">O que precisa ser feito?</FormLabel>
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
              <FormLabel className="ml-1 font-semibold">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione detalhes sobre a tarefa..."
                  className="resize-none rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 font-semibold text-neutral-400">Prioridade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full transition-all hover:border-neutral-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl shadow-xl">
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="h-4 text-green-500" /> Baixa
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 text-amber-500" /> Média
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
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
                <FormLabel className="ml-1 font-semibold text-neutral-400">Status inicial</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full transition-all hover:border-neutral-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl shadow-xl">
                    <SelectGroup>
                      <SelectLabel className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-neutral-500">
                        Status da tarefa
                      </SelectLabel>

                      <SelectItem value="pending" className="cursor-pointer rounded-md transition-colors focus:bg-neutral-800">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>Pendente</span>
                        </div>
                      </SelectItem>

                      <SelectItem value="in_progress" className="cursor-pointer rounded-md transition-colors focus:bg-blue-500/10 focus:text-blue-400">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                          <span>Em progresso</span>
                        </div>
                      </SelectItem>

                      <SelectItem value="completed" className="cursor-pointer rounded-md transition-colors focus:bg-emerald-500/10 focus:text-emerald-500">
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
                <FormLabel className="ml-1 font-semibold text-neutral-400">Prazo final</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button type="button" variant="outline" className={cn("w-full justify-between")}>
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
