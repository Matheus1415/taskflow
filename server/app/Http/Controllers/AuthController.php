<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
     * Autenticar usuário e gerar token de acesso
     *
     * Este endpoint realiza a autenticação do usuário utilizando e-mail e senha.
     * Caso as credenciais sejam válidas, um novo token de acesso é gerado e quaisquer tokens anteriores são revogados para garantir segurança da sessão.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return $this->error('Credenciais inválidas');
        }

        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('auth-token')->plainTextToken;

        return $this->success(
            'Login realizado com sucesso',
            [
                'user' => $user,
                'token' => $token
            ]
        );
    }

    /**
     * Encerrar sessão do usuário autenticado
     *
     * Este endpoint realiza o logout do usuário autenticado,
     * removendo o token de acesso atualmente em uso.
     *
     * Caso o usuário não esteja autenticado, uma mensagem de erro
     * será retornada informando que não há sessão ativa.
     */
    public function logout(Request $request)
    {
        if (!Auth::user()) {
            return $this->error('Usuário não está logado');
        }

        $currentToken = Auth::user()->currentAccessToken();

        $currentToken->delete();

        return $this->success(
            'Logout realizado com sucesso'
        );
    }

    /**
     * Registrar novo usuário no sistema
     *
     * Este endpoint cria um novo usuário com base nos dados informados.
     * A senha é armazenada de forma segura após criptografia.
     *
     * Após o cadastro, o usuário poderá autenticar-se utilizando suas credenciais.
     */
    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();

        $createdUser = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password']
        ]);

        return $this->success(
            'Usuário criado com sucesso'
        );
    }
}
