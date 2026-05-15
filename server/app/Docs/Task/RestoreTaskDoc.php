<?php

namespace App\Docs\Task;

class RestoreTaskDoc
{
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
     * @authenticated
     *
     * @urlParam id integer required ID da tarefa que está na lixeira. Ex: 1
     *
     * @response 200 {
     * "success": true,
     * "message": "Tarefa restaurada com sucesso",
     * "data": {
     * "id": 1,
     * "title": "Minha tarefa recuperada",
     * "status": "pending",
     * "deleted_at": null
     * }
     * }
     *
     * @response 401 {
     * "success": false,
     * "message": "Usuário não autenticado"
     * }
     */
    public function __invoke()
    {
        // Classe usada apenas para documentação
    }
}