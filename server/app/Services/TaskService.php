<?php

namespace App\Services;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{

    public function index(array $filters)
    {
        $query = Task::query()
            ->where('user_id', Auth::id());

        /*
        |----------------------------------
        | SOFT DELETE FILTER
        |----------------------------------
        | active - só não deletados (padrão)
        | only   - só deletados (lixeira)
        | with   - todos
        */
        $trashed = $filters['trashed'] ?? 'with';

        if ($trashed === 'only') {
            $query->onlyTrashed();
        }

        if ($trashed === 'with') {
            $query->withTrashed();
        }

        $query->when(
            $filters['search'] ?? null,
            fn($q, $search) =>
            $q->where(function ($subQuery) use ($search) {
                $subQuery
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
        );

        $query->when(
            $filters['status'] ?? null,
            fn($q, $status) =>
            $q->where('status', $status)
        );

        $query->when(
            $filters['priority'] ?? null,
            fn($q, $priority) =>
            $q->where('priority', $priority)
        );

        $query->when(
            $filters['due_date'] ?? null,
            fn($q, $dueDate) =>
            $q->whereDate('due_date', $dueDate)
        );

        $tasks = $query
            ->latest()
            ->paginate($filters['per_page'] ?? 10);

        return [
            'items' => $tasks->items(),

            'pagination' => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),

                'from' => $tasks->firstItem(),
                'to' => $tasks->lastItem(),

                'has_more_pages' => $tasks->hasMorePages(),
            ],
        ];
    }

    public function first(int $id): Task
    {
        return Task::query()
            ->where('user_id', Auth::id())
            ->findOrFail($id);
    }

    public function create(array $data): Task
    {
        return Task::create([
            ...$data,
            'user_id' => Auth::id(),
        ]);
    }

    public function update(int $id, array $data): ?Task
    {
        $task = Task::withTrashed()
            ->where('user_id', Auth::id())
            ->find($id);

        if (!$task) {
            return null;
        }

        if (
            isset($data['status']) &&
            $data['status'] === TaskStatus::DONE->value
        ) {
            $data['completed_at'] = now();
        }

        if (
            isset($data['status']) &&
            $data['status'] !== TaskStatus::DONE->value
        ) {
            $data['completed_at'] = null;
        }

        unset($data['user_id']);
        $task->update($data);

        return $task->fresh();
    }

    public function destroy(int $id): bool
    {
        $task = Task::withTrashed()
            ->where('user_id', Auth::id())
            ->find($id);

        if (!$task) {
            return false;
        }

        if ($task->trashed()) {
            $task->forceDelete();

            return true;
        }

        $task->delete();

        return true;
    }

    public function restore(int $id): ?Task
    {
        $task = Task::onlyTrashed()
            ->where('user_id', Auth::id())
            ->find($id);

        if (!$task) {
            return null;
        }

        $task->restore();

        return $task->fresh();
    }
}
