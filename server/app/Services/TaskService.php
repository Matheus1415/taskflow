<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function create(array $data): Task
    {
        return Task::create([
            ...$data,
            'user_id' => Auth::id(),
        ]);
    }
}