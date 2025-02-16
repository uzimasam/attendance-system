<?php

use App\Http\Controllers\AnalyticsController;
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
    Route::group(['prefix'=> 'lecturers'], function () {
        Route::get('/', [DashboardController::class, 'printLecturers'])->name('printing.lecturers');
        Route::post('/addCard', [DashboardController::class, 'addCard'])->name('lecturers.addCard');
        Route::post('/swapCard', [DashboardController::class, 'swapCard'])->name('lecturers.swapCard');
    });
    Route::group(['prefix'=> 'students'], function () {
        Route::get('/', [DashboardController::class, 'printStudents'])->name('printing.students');
        Route::post('/addCard', [DashboardController::class,'addStudentCard'])->name('students.addCard');
        Route::post('/swapCard', [DashboardController::class,'swapStudentCard'])->name('students.swapCard');
        Route::post('/store', [StudentController::class, 'store'])->name('students.store');
    });
    Route::group(['prefix'=> 'profile'], function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::group(['prefix'=> 'schedule'], function () {
        Route::get('/', [ScheduleController::class, 'index'])->name('schedule');
        Route::post('/store', [ScheduleController::class, 'store'])->name('schedule.store');
        Route::post('/reschedule', [ScheduleController::class, 'reschedule'])->name('schedule.reschedule');
    });
    Route::group(['prefix'=> 'attendance'], function () {
        Route::get('/', [AttendanceController::class, 'index'])->name('attendance');
        Route::get('/{attendance_link}', [AttendanceController::class, 'portal'])->name('attendance.portal');
        Route::post('/store', [AttendanceController::class, 'store'])->name('attendances.store');
        Route::post('/mark', [AttendanceController::class, 'mark'])->name('attendance.mark');
    });
    Route::group(['prefix'=> 'unit'], function () {
        Route::get('/', [UnitController::class, 'index'])->name('unit');
        Route::post('/store', [UnitController::class, 'store'])->name('unit.store');
    });
    Route::group(['prefix'=> 'program'], function () {
        Route::get('/{code}', [ProgramController::class, 'index'])->name('program');
        Route::post('/store', [ProgramController::class, 'store'])->name('program.store');
    });
    Route::get('/setup', [ProgramController::class, 'setup'])->name('setup');
    Route::post('/school/store', [SchoolController::class, 'store'])->name('school.store');
    Route::group(['prefix' => 'analytics'], function () {
        Route::get('/', [AnalyticsController::class, 'index'])->name('analytics');
    });
});

require __DIR__.'/auth.php';
