<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;

class UpdateTaskRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'status' => [
                'sometimes',
                Rule::in(array_column(TaskStatus::cases(), 'value')),
            ],

            'priority' => [
                'sometimes',
                Rule::in(array_column(TaskPriority::cases(), 'value')),
            ],

            'due_date' => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.string' => 'O título deve ser um texto válido.',
            'title.max' => 'O título não pode ter mais de 255 caracteres.',

            'status.in' => 'O status informado é inválido.',

            'priority.in' => 'A prioridade informada é inválida.',

            'due_date.date' => 'A data de vencimento deve ser válida.',
        ];
    }
}