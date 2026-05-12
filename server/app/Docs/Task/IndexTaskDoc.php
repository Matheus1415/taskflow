<?php

namespace App\Docs\Task;

class IndexTaskDoc
{
    /**
     * @authenticated
     *
     * @queryParam page integer Número da página. Ex: 1
     * @queryParam per_page integer Quantidade de registros por página. Ex: 10
     * @queryParam search string Busca textual por título ou descrição.
     * @queryParam status string Filtrar por status (pending, in_progress, done)
     * @queryParam priority string Filtrar por prioridade (low, medium, high)
     * @queryParam due_date date Filtrar por data de vencimento (YYYY-MM-DD)
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Lista de tarefas",
     *   "data": {
     *     "tasks": [
     *       {
     *         "id": 1,
     *         "title": "Estudar Laravel",
     *         "description": "Implementar Service Layer",
     *         "status": {
     *           "value": "in_progress",
     *           "label": "Em andamento"
     *         },
     *         "priority": {
     *           "value": "high",
     *           "label": "Alta"
     *         },
     *         "due_date": "2026-05-20T00:00:00.000000Z",
     *         "completed_at": null,
     *         "is_completed": false,
     *         "is_overdue": false,
     *         "created_at": "2026-05-11T21:17:38.000000Z",
     *         "updated_at": "2026-05-11T21:17:38.000000Z"
     *       }
     *     ],
     *     "pagination": {
     *       "current_page": 1,
     *       "last_page": 5,
     *       "per_page": 10,
     *       "total": 42,
     *       "from": 1,
     *       "to": 10,
     *       "has_more_pages": true
     *     }
     *   }
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