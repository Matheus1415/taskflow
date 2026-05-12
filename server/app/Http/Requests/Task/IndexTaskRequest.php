<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;

class IndexTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],

            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],

            'search' => ['nullable', 'string', 'max:255'],

            'status' => [
                'nullable',
                Rule::in(array_column(TaskStatus::cases(), 'value')),
            ],

            'priority' => [
                'nullable',
                Rule::in(array_column(TaskPriority::cases(), 'value')),
            ],

            'due_date' => ['nullable', 'date'],

            'trashed' => [
                'nullable',
                Rule::in(['active', 'only', 'with']),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'page.integer' => 'A página deve ser um número inteiro.',

            'per_page.integer' => 'O limite por página deve ser um número inteiro.',
            'per_page.max' => 'O limite máximo por página é 100.',

            'status.in' => 'O status informado é inválido.',
            'priority.in' => 'A prioridade informada é inválida.',

            'due_date.date' => 'A data de vencimento deve ser válida.',

            'trashed.in' => 'O filtro de lixeira deve ser: active, only ou with.',
        ];
    }
}