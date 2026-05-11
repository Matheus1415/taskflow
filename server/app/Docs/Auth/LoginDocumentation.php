<?php

namespace App\Docs\Auth;

trait LoginDocumentation
{
    /**
     * Autenticar usuário e gerar token de acesso
     *
     * Este endpoint realiza a autenticação do usuário utilizando e-mail e senha.
     * Caso as credenciais sejam válidas, um novo token de acesso é gerado e
     * quaisquer tokens anteriores são revogados para garantir segurança da sessão.
     *
     * @unauthenticated
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Login realizado com sucesso",
     *   "data": {
     *     "user": {
     *       "id": 1,
     *       "name": "Matheus Pereira",
     *       "email": "matheus@example.com"
     *     },
     *     "token": "1|sanctum_token"
     *   }
     * }
     *
     * @response 401 {
     *   "success": false,
     *   "message": "Credenciais inválidas"
     * }
     */
    abstract public function login(\App\Http\Requests\Auth\LoginRequest $request);

    /**
     * Encerrar sessão do usuário autenticado
     *
     * Este endpoint realiza o logout do usuário autenticado,
     * removendo o token de acesso atualmente em uso.
     *
     * Caso o usuário não esteja autenticado, uma mensagem de erro
     * será retornada informando que não há sessão ativa.
     *
     * @authenticated
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Logout realizado com sucesso"
     * }
     *
     * @response 401 {
     *   "success": false,
     *   "message": "Usuário não está logado"
     * }
     */
    abstract public function logout(\Illuminate\Http\Request $request);

    /**
     * Registrar novo usuário no sistema
     *
     * Este endpoint cria um novo usuário com base nos dados informados.
     * A senha é armazenada de forma segura após criptografia.
     *
     * Após o cadastro, o usuário poderá autenticar-se utilizando suas credenciais.
     *
     * @unauthenticated
     *
     * @bodyParam name string required Nome completo do usuário. Ex: João Silva
     * @bodyParam email string required E-mail do usuário. Ex: joao@email.com
     * @bodyParam password string required Senha do usuário.
     *
     * @response 200 {
     *   "success": true,
     *   "message": "Usuário criado com sucesso"
     * }
     *
     * @response 422 {
     *   "success": false,
     *   "message": "Erro de validação dos dados"
     * }
     */
    abstract public function register(\App\Http\Requests\Auth\RegisterRequest $request);
}