<?php

namespace App\Http\Controllers;

use App\Models\Cohort;
use App\Models\Schedule;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // render view with Inertia to display all schedules
        $cohorts = Cohort::orderBy('code','asc')->get();
        $schedules = Schedule::with('cohort')->with('unit')->get();
        $units = Unit::orderBy('code','asc')->get();
        return Inertia::render('Schedule/Index', [
            'cohorts'=> $cohorts,
            'schedules' => $schedules,
            'units'=> $units
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
