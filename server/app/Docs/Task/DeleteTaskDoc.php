<?php

namespace App\Docs\Task;

class DeleteTaskDoc
{
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
     *
     * ## Regras de segurança:
     * - A tarefa deve existir
     * - A tarefa deve pertencer ao usuário autenticado
     *
     * @authenticated
     *
     * @urlParam id integer required ID da tarefa. Ex: 1
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Tarefa removida com sucesso"
     * }
     *
     * @response 404 {
     *   "success": false,
     *   "message": "Tarefa não encontrada"
     * }
     *
     * @response 401 {
     *   "success": false,
     *   "message": "Usuário não autenticado"
     * }
     */
    public function __invoke()
    {
        // Classe usada apenas para documentação
    }
}