import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function BtnTaskTutorial() {
  const startTour = () => {
    const driverInstance = driver({
      showProgress: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      stagePadding: 6,
      prevBtnText: "Ant.",
      nextBtnText: "Prox.",
      doneBtnText: "Finalizar",
      progressText: "{{current}} de {{total}}",
    });

    driverInstance.setSteps([
      {
        popover: {
          title: "Bem-vindo ao TaskFlow",
          description:
            "Este tutorial apresenta o TaskFlow, uma interface para organizar tarefas, acompanhar prioridades e gerenciar o fluxo do dia a dia.",
        },
      },
      {
        element: "#task-toolbar",
        popover: {
          title: "Área de filtros",
          description:
            "Aqui ficam os filtros principais da tela. Com eles você encontra tarefas mais rápido e ajusta a visualização do jeito que precisar.",
        },
      },
      {
        element: "#task-search-filter",
        popover: {
          title: "Busca por texto",
          description:
            "Use este campo para pesquisar tarefas por título ou descricao e localizar atividades especificas rapidamente.",
        },
      },
      {
        element: "#task-priority-filter",
        popover: {
          title: "Filtro de prioridade",
          description:
            "Neste seletor você pode exibir apenas tarefas com prioridade alta, média, baixa ou visualizar todas.",
        },
      },
      {
        element: "#task-sort-filter",
        popover: {
          title: "Ordenação de tarefas",
          description:
            "Aqui você escolhe como a lista será organizada, por exemplo por tarefas mais recentes, mais antigas, prazo ou prioridade.",
        },
      },
      {
        element: "#task-create-button",
        popover: {
          title: "Criar nova tarefa",
          description:
            "Este botão abre o formulário para cadastrar uma nova tarefa e alimentar o seu fluxo de trabalho.",
        },
      },
      {
        element: "#task-tabs-list",
        popover: {
          title: "Tabs de status",
          description:
            "As tabs separam as tarefas por status. Você  pode navegar entre não iniciadas, em progresso, concluídas e também acessar a lixeira.",
        },
      },
      {
        element: "#task-table",
        popover: {
          title: "Tabela de tarefas",
          description:
            "Nesta tabela você acompanha os detalhes de cada tarefa, como título, status, prioridade, prazo e situação  geral.",
        },
      },
      {
        element: "#task-bulk-actions",
        popover: {
          title: "Ações disponíveis ",
          description:
            "Ao selecionar tarefas, a barra superior libera ações em lote, como excluir, mover para a lixeira, restaurar e atualizar o status para em progresso ou concluído .",
        },
      },
      {
        popover: {
          title: "Projeto do teste tecnico",
          description:
            "Este sistema foi feito para o teste tecnico. Para acessar o codigo-fonte no GitHub, visite: https://github.com/Matheus1415/taskflow",
        },
      },
    ]);

    driverInstance.drive();
  };

  return (
    <Button
      variant="outline"
      onClick={startTour}
      id="tour-task"
      className="group gap-2 border-primary/20 bg-primary/5 transition-all hover:bg-primary/10 hover:border-primary/50"
    >
      <Sparkles className="h-4 w-4 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110" />
      <span className="font-medium">Guia Rápido</span>
    </Button>
  );
}
