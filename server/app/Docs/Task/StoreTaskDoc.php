<?php

namespace App\Docs\Task;

class StoreTaskDoc
{
    /**    
     * @authenticated
     *
     * @bodyParam title string required Título da tarefa. Ex: Estudar Laravel
     * @bodyParam description string Descrição opcional da tarefa.
     * @bodyParam status string Status da tarefa (pending, in_progress, done)
     * @bodyParam priority string Prioridade da tarefa (low, medium, high)
     * @bodyParam due_date date Data de vencimento da tarefa no formato YYYY-MM-DD
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Tarefa criada com sucesso",
     *   "data": {
     *     "id": 1,
     *     "title": "Estudar Laravel",
     *     "description": "Implementar Service Layer",
     *     "status": "in_progress",
     *     "priority": "high",
     *     "due_date": "2026-05-20T00:00:00.000000Z",
     *     "created_at": "2026-05-11T21:17:38.000000Z",
     *     "updated_at": "2026-05-11T21:17:38.000000Z"
     *   }
     * }
     *
     * @response 422 {
     *   "success": false,
     *   "message": "Erro de validação dos dados",
     *   "errors": {
     *     "title": ["O título da tarefa é obrigatório."]
     *   }
     * }
     */
    public function __invoke()
    {
        // Classe usada apenas para documentação
    }
}