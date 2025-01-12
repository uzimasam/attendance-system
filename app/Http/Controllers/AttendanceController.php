<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Attendance/Index', [
            'attendances' => Attendance::all(),
        ]);
    }

    public function portal($attendance_link)
    {
        $schedule = Schedule::where('attendance_link', $attendance_link)->where('user_id', auth()->user()->id)->with('lecturer')->with('attendances')->with('attendances.student')->with('unit')->with('cohort')->first();
        return Inertia::render('Attendance/Index', [
            'schedule' => $schedule,
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
        foreach ($request->attendances as $attendance) {
            $tomark = Attendance::where((['schedule_id' => $attendance['schedule_id'], 'student_id' => $attendance['student_id']]))->first();
            if ($tomark) {
                $tomark->attendance_status = $attendance['attendance_status'];
                $tomark->save();
            }
        }
        return redirect()->route('attendance');
    }

    public function mark(Request $request)
    {
        Log::info($request);
        $tomark = Attendance::where((['schedule_id' => $request->schedule_id, 'student_id' => $request->student_id]))->first();
        if ($tomark) {
            $tomark->attendance_status = $request->status;
            $tomark->save();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    /**
     * Function to receive attendance data from the attendance device
     */
    public function attendance(Request $request)
    {
        // log the request
        Log::info($request);
        /**
         * Sample request
         * {
         *  "card_uid": "1234567890",
         *  "device_token": "1234567890",
         * }
        */
        return response()->json(['message' => 'Attendance Data received']);
    }
}
