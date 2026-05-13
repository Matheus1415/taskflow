import { 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Search 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface TaskToolbarProps {
  onOpenChange: (open: boolean) => void;
}

export default function TaskToolbar({ onOpenChange }: TaskToolbarProps) {
  return (
    <div className="flex flex-col gap-3 p-1 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2 max-w-2xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Pesquisar tarefas..."
            className="h-10 pl-9 rounded-xl border-border/50 bg-card/50 shadow-sm transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl border-border/50 bg-card hover:bg-accent hover:text-accent-foreground shadow-sm"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filtrar tarefas</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl border-border/50 bg-card hover:bg-accent hover:text-accent-foreground shadow-sm"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ordenar por</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <Button 
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