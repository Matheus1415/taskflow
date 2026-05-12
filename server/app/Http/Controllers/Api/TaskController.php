<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\IndexTaskRequest;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $service
    ) {
    }

    /**
     * Listar tarefas do usuário autenticado
     *
     * Este endpoint retorna uma listagem paginada das tarefas
     * vinculadas ao usuário autenticado.
     *
     * A listagem suporta:
     * - Paginação
     * - Busca textual
     * - Filtro por status
     * - Filtro por prioridade
     * - Filtro por data de vencimento
     *
     * @see IndexTaskDoc
     */
    public function index(IndexTaskRequest $request)
    {
        $tasks = $this->service->index(
            $request->validated()
        );

        return $this->success(
            'Lista de tarefas',
            $tasks
        );
    }

    public function show(int $id)
    {
        $task = $this->service->first($id);

        return $this->success(
            'Tarefa encontrada com sucesso', $task
        );
    }

    /**
     * Criar nova tarefa
     *
     * Este endpoint cria uma nova tarefa vinculada ao usuário autenticado.
     *
     * A tarefa segue as regras de negócio do sistema:
     * - O título é obrigatório
     * - A descrição é opcional
     * - Status e prioridade possuem valores padrão caso não sejam enviados
     * - A tarefa será automaticamente associada ao usuário logado
     *
     * Esse endpoint faz parte do módulo de gerenciamento de tarefas (Task Management).
     * @see StoreTaskDoc
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $this->service->create(
            $request->validated()
        );

        return $this->success(
            'Tarefa criada com sucesso',
            $task
        );
    }
}
