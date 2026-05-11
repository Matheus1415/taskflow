<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
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
