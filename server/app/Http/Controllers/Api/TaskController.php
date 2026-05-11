<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Services\TaskService;
//Docs
use App\Docs\Task\StoreTaskDoc;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $service
    ) {
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
