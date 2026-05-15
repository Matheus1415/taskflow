<?php

namespace Tests\Feature\Task;

use App\Models\User;
use App\Models\Task;
use App\Enums\TaskStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateTaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa se um usuário pode atualizar sua própria tarefa
     */
    public function test_user_can_update_their_own_task(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'status' => TaskStatus::PENDING
        ]);

        $updateData = [
            'title' => 'Título Atualizado',
            'priority' => 'low',
            'status' => TaskStatus::DONE->value
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updateData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Título Atualizado',
            'status' => TaskStatus::DONE->value
        ]);
    }

    /**
     * Testa se um usuário não pode atualizar tarefa de outro usuário
     */
    public function test_user_cannot_update_someone_elses_task(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $taskOfUserB = Task::factory()->create([
            'user_id' => $userB->id,
            'status' => TaskStatus::PENDING
        ]);

        Sanctum::actingAs($userA);

        $response = $this->putJson("/api/tasks/{$taskOfUserB->id}", [
            'title' => 'Tentando hackear',
            'status' => TaskStatus::PENDING->value,
            'priority' => 'high'
        ]);

        $response->assertStatus(403);
    }

    /**
     * Testa se um usuário não pode alterar o proprietário de uma tarefa via atualização
     */
    public function test_cannot_change_task_owner_via_update(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'status' => TaskStatus::PENDING
        ]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Mudando título',
            'status' => TaskStatus::PENDING->value,
            'priority' => 'medium',
            'user_id' => 888
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'user_id' => $user->id
        ]);
    }
}