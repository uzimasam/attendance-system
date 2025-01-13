<?php

use App\Http\Controllers\AttendanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/participate', [AttendanceController::class,'attendance'])->name('attend');
Route::get('/card', [AttendanceController::class,'card'])->name('card');
