<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function landing()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'lectureCount' => User::where('role', 'lecturer')->count(),
            'studentCount' => Student::count(),
        ]);
    }
    public function index()
    {
        $user = auth()->user()->load('schedules')->load('todaySchedules')->load('yesterdaySchedules')->load('upcomingSchedules')->load('units');
        $todayScheduleCount = $user->todaySchedules->count();
        $yesterdayScheduleCount = $user->yesterdaySchedules->count();
        $upcomingSchedules = $user->upcomingSchedules;
        $unitCount = $user->units->count();
        // jan - april is sem 1, may - aug is sem 2, sept - dec is sem 3
        $studentCount = Student::count();
        // check which semester we are in and get the students created in that semester
        $currentMonth = date('m');
        $currentSemester = 1;
        if ($currentMonth >= 5 && $currentMonth <= 8) {
            $currentSemester = 2;
        } elseif ($currentMonth >= 9 && $currentMonth <= 12) {
            $currentSemester = 3;
        }
        $newStudentCount = Student::whereMonth('created_at', '>=', ($currentSemester - 1) * 4 + 1)
            ->whereMonth('created_at', '<=', $currentSemester * 4)
            ->count();
        return Inertia::render("Dashboard", [
            'newStudentCount' => $newStudentCount,
            'studentCount' => $studentCount,
            'todayScheduleCount' => $todayScheduleCount,
            'upcomingSchedules' => $upcomingSchedules,
            'unitCount'=> $unitCount,
            'yesterdayScheduleCount' => $yesterdayScheduleCount
        ]);
    }
}
