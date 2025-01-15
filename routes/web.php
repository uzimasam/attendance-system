<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class,'landing'])->name('landing');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');
    Route::get('lecturers', [DashboardController::class, 'printLecturers'])->name('printing.lecturers');
    Route::post('lecturers/addCard', [DashboardController::class, 'addCard'])->name('lecturers.addCard');
    Route::post('lecturers/swapCard', [DashboardController::class, 'swapCard'])->name('lecturers.swapCard');
    Route::get('students', [DashboardController::class, 'printStudents'])->name('printing.students');
    Route::post('students/addCard', [DashboardController::class,'addStudentCard'])->name('students.addCard');
    Route::post('students/swapCard', [DashboardController::class,'swapStudentCard'])->name('students.swapCard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule');
    Route::post('/schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::get('/attendance', [AttendanceController::class, 'index'])->name('attendance');
    Route::get('/attendance/{attendance_link}', [AttendanceController::class, 'portal'])->name('attendance.portal');
    Route::post('/attendance/store', [AttendanceController::class, 'store'])->name('attendances.store');
    Route::post('/attendance/mark', [AttendanceController::class, 'mark'])->name('attendance.mark');
    Route::get('/unit', [UnitController::class, 'index'])->name('unit');
    Route::post('/unit/store', [UnitController::class, 'store'])->name('unit.store');
    Route::get('/program', [ProgramController::class, 'index'])->name('program');
    Route::post('/program/store', [ProgramController::class, 'store'])->name('program.store');
    Route::get('/setup', [ProgramController::class, 'setup'])->name('setup');
    Route::post('/school/store', [SchoolController::class, 'store'])->name('school.store');
    Route::post('/students/store', [StudentController::class, 'store'])->name('students.store');
});

require __DIR__.'/auth.php';
