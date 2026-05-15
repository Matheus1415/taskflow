<?php

namespace Tests\Feature\Task;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateTaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa se um usuário autenticado pode criar uma tarefa
     * e se o sistema ignora tentativas de forçar o user_id.
     */
    public function test_authenticated_user_can_create_task_and_owner_is_forced(): void
    {

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $taskData = [
            'title' => 'Estudar Testes no Laravel',
            'description' => 'Aprender a usar PHPUnit e RefreshDatabase',
            'priority' => 'high',
            'status' => 'pending',
            'due_date' => now()->addDays(1)->format('Y-m-d'),
            'user_id' => 999
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
            ->assertJsonPath('data.title', $taskData['title']);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Estudar Testes no Laravel',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseMissing('tasks', [
            'user_id' => 999
        ]);
    }

    /**
     * Testa se um usuário não autenticado é bloqueado ao tentar criar tarefa.
     */
    public function test_unauthenticated_user_cannot_create_task(): void
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Tarefa não autorizada'
        ]);

        $response->assertStatus(401);
    }

    /**
     * Testa validação de campos obrigatórios.
     */
    public function test_cannot_create_task_without_required_fields(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/tasks', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }
}