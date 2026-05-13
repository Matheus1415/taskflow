export type Task = {
  id: string;
  title: string;
  status: "Pendente" | "Em Progresso" | "Concluída";
  priority: "Baixa" | "Média" | "Alta";
  dueDate: Date;
  completed: boolean;
};
