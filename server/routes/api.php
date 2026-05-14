<?php

use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout')->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

Route::middleware([
    'auth:sanctum',
])->group(function () {
    Route::get('/me', [MeController::class, 'me'])->name('me');
    Route::apiResource('tasks', TaskController::class);
});