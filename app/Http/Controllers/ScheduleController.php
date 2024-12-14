<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Cohort;
use App\Models\CohortStudent;
use App\Models\Schedule;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
use Str;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // render view with Inertia to display all schedules
        $cohorts = Cohort::orderBy('code', 'asc')->get();
        $schedules = Schedule::with('cohort')->with('unit')->get();
        $units = Unit::orderBy('code', 'asc')->get();
        return Inertia::render('Schedule/Index', [
            'cohorts' => $cohorts,
            'schedules' => $schedules,
            'units' => $units
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
        // validate the request
        $request->validate(Schedule::$rules);

        // create an attendance link as a random 10 character string
        $link = Str::random(10);
        while (Schedule::where('attendance_link', $link)->first()) {
            $link = Str::random(10);
        }

        // create the schedule
        $schedule = Schedule::create([
            'attendance_link' => $link,
            'user_id' => auth()->user()->id,
            'unit_id' => $request->unit_id,
            'cohort_id' => $request->cohort_id,
            'day' => $request->day,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'venue' => $request->venue,
            'status' => 'active'
        ]);

        // create an attendance record for each student in the cohort
        $cohortStudents = CohortStudent::where('cohort_id', $request->cohort_id)->get();
        foreach ($cohortStudents as $cohortStudent) {
            $student = $cohortStudent->student;
            // check if the student has an attendance record for the schedule
            if (!Attendance::where('student_id', $student->id)->where('schedule_id', $schedule->id)->first()) {
                Attendance::create([
                    'schedule_id' => $schedule->id,
                    'student_id' => $student->id,
                    'attendance_status' => 'pending'
                ]);
            }
        }

        return redirect()->route('schedule')->with('success', 'Class scheduled successfully');
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
