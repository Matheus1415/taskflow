<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string'   => 'O nome deve ser um texto válido.',
            'name.max'      => 'O nome não pode ter mais que :max caracteres.',

            'email.required' => 'O e-mail é obrigatório.',
            'email.string'   => 'O e-mail deve ser um texto válido.',
            'email.email'    => 'Informe um endereço de e-mail válido.',
            'email.max'      => 'O e-mail não pode ter mais que :max caracteres.',
            'email.unique'   => 'Este e-mail já está em uso.',

            'password.required' => 'A senha é obrigatória.',
            'password.string'   => 'A senha deve ser um texto válido.',
            'password.min'      => 'A senha deve ter no mínimo :min caracteres.',
            'password.max'      => 'A senha não pode ter mais que :max caracteres.',
        ];
    }
}
