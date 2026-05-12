<?php

namespace App\Docs\Task;

class UpdateTaskDoc
{
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
     *
     * @authenticated
     *
     * @urlParam id integer required ID da tarefa. Ex: 1
     *
     * @bodyParam title string Título da tarefa. Ex: Estudar Laravel
     * @bodyParam description string Descrição opcional da tarefa.
     * @bodyParam status string Status da tarefa (pending, in_progress, done)
     * @bodyParam priority string Prioridade da tarefa (low, medium, high)
     * @bodyParam due_date date Data de vencimento da tarefa no formato YYYY-MM-DD
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Tarefa atualizada com sucesso",
     *   "data": {
     *     "id": 1,
     *     "title": "Estudar Laravel",
     *     "description": "Implementar Service Layer",
     *     "status": {
     *       "value": "done",
     *       "label": "Concluída"
     *     },
     *     "priority": {
     *       "value": "high",
     *       "label": "Alta"
     *     },
     *     "due_date": "2026-05-20T00:00:00.000000Z",
     *     "completed_at": "2026-05-12T10:00:00.000000Z",
     *     "is_completed": true,
     *     "is_overdue": false,
     *     "created_at": "2026-05-11T21:17:38.000000Z",
     *     "updated_at": "2026-05-12T10:00:00.000000Z"
     *   }
     * }
     *
     * @response 404 {
     *   "success": false,
     *   "message": "Tarefa não encontrada"
     * }
     *
     * @response 422 {
     *   "success": false,
     *   "message": "Erro de validação dos dados",
     *   "errors": {
     *     "status": ["O status informado é inválido."]
     *   }
     * }
     */
    public function __invoke()
    {
        // Classe usada apenas para documentação
    }
}