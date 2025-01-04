<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('schedules')->load('todaySchedules')->load('yesterdaySchedules')->load('upcomingSchedules');
        $todayScheduleCount = $user->todaySchedules->count();
        $yesterdayScheduleCount = $user->yesterdaySchedules->count();
        $upcomingSchedules = $user->upcomingSchedules;
        return Inertia::render("Dashboard", [
            'todayScheduleCount' => $todayScheduleCount,
            'upcomingSchedules' => $upcomingSchedules,
            'yesterdayScheduleCount' => $yesterdayScheduleCount
        ]);
    }
}
