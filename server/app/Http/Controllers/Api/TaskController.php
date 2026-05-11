<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Services\TaskService;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $service
    ) {
    }


    public function store(StoreTaskRequest $request)
    {
        $task = $this->service->create(
            $request->validated()
        );

        return $this->success(
            'Tarefa criada com sucesso',
            $task
        );
    }
}
