<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule');
    Route::post('/schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::get('/attendance', [AttendanceController::class, 'index'])->name('attendance');
    Route::get('attendance/{attendance_link}', [AttendanceController::class, 'portal'])->name('attendance.portal');
    Route::get('/unit', [UnitController::class, 'index'])->name('unit');
    Route::post('/unit/store', [UnitController::class, 'store'])->name('unit.store');
    Route::get('/program', [ProgramController::class, 'index'])->name('program');
    Route::post('/program/store', [ProgramController::class, 'store'])->name('program.store');
    Route::get('/setup', [ProgramController::class, 'setup'])->name('setup');
    Route::post('/school/store', [SchoolController::class, 'store'])->name('school.store');
    Route::post('/students/store', [StudentController::class, 'store'])->name('students.store');
});

require __DIR__.'/auth.php';
