<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\IndexTaskRequest;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;

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
            $task,
            201
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

        $this->authorize('update', $task);

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

    /**
     * Excluir tarefa (Soft Delete + Exclusão definitiva)
     *
     * Este endpoint realiza a exclusão de uma tarefa seguindo um fluxo de lixeira (soft delete).
     *
     * ## Comportamento:
     *
     * - Na primeira chamada:
     *   - A tarefa NÃO é removida do banco
     *   - O campo `deleted_at` é preenchido
     *   - A tarefa passa a ser considerada "na lixeira"
     *
     * - Na segunda chamada (quando a tarefa já está na lixeira):
     *   - A tarefa é removida permanentemente do banco de dados
     * @see DeleteTaskDoc
     */
    public function destroy(int $id)
    {
        $task = $this->service->first($id);

        if (!$task) {
            return $this->error('Tarefa não encontrada', 404);
        }

        $this->authorize('delete', $task);

        $this->service->destroy($id);

        return $this->success('Tarefa removida com sucesso', 204);
    }

    /**
     * Restaurar tarefa (Lixeira)
     *
     * Este endpoint recupera uma tarefa que foi previamente enviada para a lixeira (soft delete).
     *
     * ## Comportamento:
     *
     * - O campo `deleted_at` da tarefa é limpo (definido como null).
     * - A tarefa volta a aparecer nas listagens comuns de tarefas ativas.
     * - Todos os dados originais da tarefa (título, prazos, prioridade) são preservados.
     *
     * @see RestoreTaskDoc
     */
    public function restore(int $id)
    {
        $task = $this->service->restore($id);

        $this->authorize('restore', $task);

        if (!$task) {
            return $this->error(
                'Tarefa não encontrada',
                404
            );
        }

        return $this->success(
            'Tarefa restaurada com sucesso',
            $task
        );
    }
}
