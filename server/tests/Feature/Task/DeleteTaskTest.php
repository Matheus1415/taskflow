<?php

namespace Tests\Feature\Task;

use App\Models\User;
use App\Models\Task;
use App\Enums\TaskStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DeleteTaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_soft_delete_their_own_task(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'status' => TaskStatus::PENDING->value
        ]);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted('tasks', [
            'id' => $task->id
        ]);
    }

    public function test_user_cannot_delete_someone_elses_task(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $taskOfUserB = Task::factory()->create([
            'user_id' => $userB->id,
            'status' => TaskStatus::PENDING->value
        ]);

        Sanctum::actingAs($userA);

        $response = $this->deleteJson("/api/tasks/{$taskOfUserB->id}");

        $response->assertStatus(404);

        $this->assertDatabaseHas('tasks', [
            'id' => $taskOfUserB->id,
            'deleted_at' => null
        ]);
    }

    public function test_user_can_restore_their_soft_deleted_task(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'deleted_at' => now()
        ]);

        $response = $this->patchJson("/api/tasks/{$task->id}/restore");

        $response->assertStatus(200);

        $this->assertNotSoftDeleted('tasks', [
            'id' => $task->id
        ]);
    }

    public function test_user_cannot_restore_someone_elses_task(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $taskOfUserB = Task::factory()->create([
            'user_id' => $userB->id,
            'deleted_at' => now()
        ]);

        Sanctum::actingAs($userA);

        $response = $this->patchJson("/api/tasks/{$taskOfUserB->id}/restore");

        $response->assertStatus(403);
    }
}