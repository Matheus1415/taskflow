<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\IndexTaskRequest;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
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

    /**
     * Buscar tarefa específica
     *
     * Este endpoint retorna os detalhes de uma tarefa específica
     * vinculada ao usuário autenticado.
     *
     * Regras:
     * - A tarefa deve existir
     * - A tarefa deve pertencer ao usuário autenticado
     * - Caso a tarefa não exista ou não pertença ao usuário,
     *   uma resposta de erro será retornada
     * @see ShowTaskDoc
     */
    public function show(int $id)
    {
        $task = $this->service->first($id);

        return $this->success(
            'Tarefa encontrada com sucesso',
            $task
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

    /**
     * Atualizar tarefa
     *
     * Este endpoint permite atualizar parcialmente ou totalmente
     * uma tarefa vinculada ao usuário autenticado.
     *
     * Regras:
     * - A tarefa deve existir
     * - A tarefa deve pertencer ao usuário autenticado
     * - Apenas os campos enviados serão atualizados
     * - Caso o status seja alterado para "done",
     *   o campo completed_at será preenchido automaticamente
     * - Caso o status deixe de ser "done",
     *   o campo completed_at será removido
     * @see UpdateTaskDoc
     */
    public function update(UpdateTaskRequest $request, int $id)
    {
        $task = $this->service->update($id, $request->validated());

        if (!$task) {
            return $this->error(
                'Tarefa não encontrada',
                404
            );
        }

        return $this->success(
            'Tarefa atualizada com sucesso',
            $task
        );
    }

    public function destroy(int $id)
    {
        $deleted = $this->service->destroy($id);

        if (!$deleted) {
            return $this->error(
                'Tarefa não encontrada',
                404
            );
        }

        return $this->success(
            'Tarefa removida com sucesso'
        );
    }
}
