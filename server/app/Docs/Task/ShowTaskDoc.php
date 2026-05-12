<?php

namespace App\Docs\Task;

class ShowTaskDoc
{
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
     *
     * @authenticated
     *
     * @urlParam id integer required ID da tarefa. Ex: 1
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Tarefa encontrada com sucesso",
     *   "data": {
     *     "id": 1,
     *     "title": "Estudar Laravel",
     *     "description": "Implementar Service Layer",
     *     "status": {
     *       "value": "in_progress",
     *       "label": "Em andamento"
     *     },
     *     "priority": {
     *       "value": "high",
     *       "label": "Alta"
     *     },
     *     "due_date": "2026-05-20T00:00:00.000000Z",
     *     "completed_at": null,
     *     "is_completed": false,
     *     "is_overdue": false,
     *     "created_at": "2026-05-11T21:17:38.000000Z",
     *     "updated_at": "2026-05-11T21:17:38.000000Z"
     *   }
     * }
     *
     * @response 404 {
     *   "success": false,
     *   "message": "Tarefa não encontrada"
     * }
     */
    public function __invoke()
    {
        // Classe usada apenas para documentação
    }
}