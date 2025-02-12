<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Card;
use App\Models\Schedule;
use Carbon\Carbon;
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

    public function test()
    {
        $data = [
            [
                "transaction_id" => 5962,
                "name" => "Oli Grit",
                "email" => "fdhmfnb@proton.com",
                "investment_amount" => -195066,
                "joining_fee" => 0,
                "subscription_fee" => 0,
                "long_term_amount" => -195066,
                "short_term_amount" => 0,
                "penalty" => 13629.24,
                "transaction_date" => "03/02/2025"
            ],
            [
                "transaction_id" => 5684,
                "name" => "Deri Nel",
                "email" => "uziamonbdub@proton.com",
                "investment_amount" => -25000,
                "joining_fee" => 0,
                "subscription_fee" => 0,
                "long_term_amount" => -25000,
                "short_term_amount" => 0,
                "penalty" => 8233.56,
                "transaction_date" => "22/01/2025"
            ],
        ];
        return response()->json($data);
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
        // check wheter lecturer or student
        $card = Card::where('rfid_uid', $request->card_uid)->first();
        if ($card && $card->status == 'assigned') {
            $currentDate = Carbon::now()->format('Y-m-d');
            $currentTime = Carbon::now()->format('H:i:s');
            if ($card->role == 'student') {
                $student = $card->student;
                $schedules = $student->schedules;
                // of the schedules, get the one where the day is today and start_time is less than now and end_time is greater than now. Sample day in db is '2024-12-14', start_time is '08:00:00' and end_time is '10:00:00'
                $schedule = $schedules->where('status', 'marking')
                    ->where('day', $currentDate)
                    ->where('start_time', '<=', $currentTime)
                    ->where('end_time', '>=', $currentTime)
                    ->first();
                if ($schedule) {
                    // get the attendance for the student where the schedule_id is the same as the schedule above
                    $attendance = $schedule->attendanceByStudent($student->id);
                    if(isset($attendance)) {
                        $attendance->attendance_status = 'present';
                        $attendance->save();
                        return response('Attendance marked for ' . $student->name . ' for ' . $schedule->unit->code . ', ' . $schedule->cohort->code);
                    } else {
                        return response('No attendance record found for ' . $student->name . ' for ' . $schedule->unit->code . ', ' . $schedule->cohort->code);
                    }
                }
                return response('No session found');
            } elseif ($card->role == 'lecturer') {
                $lecturer = $card->lecturer;
                // get a schedule where the lecturer is the owner and day is today and start_time is less than now and end_time is greater than now. Sample day in db is '2024-12-14', start_time is '08:00:00' and end_time is '10:00:00'

                // Get the schedule where the lecturer is the owner, the day is today, the start time is less than now, and the end time is greater than now
                $schedule = Schedule::where('user_id', $lecturer->id)
                    ->whereIn('status', ['active', 'marking'])
                    ->whereDate('day', $currentDate)
                    ->whereTime('start_time', '<=', $currentTime)
                    ->whereTime('end_time', '>=', $currentTime)
                    ->first();
                if ($schedule) {
                    if ($schedule->status == 'active') {
                        $schedule->status = 'marking';
                        $schedule->save();
                        // Lecturer Samuel has started marking attendance for COMP 420, CS Y1S1
                        return response('Lecturer ' . $lecturer->name . ' has started marking attendance for ' . $schedule->unit->code . ', ' . $schedule->cohort->code);
                    }
                    // Mark all pending attendances as absent
                    foreach ($schedule->attendances as $attendance) {
                        if ($attendance->attendance_status == 'pending') {
                            $attendance->attendance_status = 'absent';
                            $attendance->save();
                        }
                    }
                    $schedule->status = 'marked';
                    $schedule->save();
                    return response('Lecturer ' . $lecturer->name . ' has finalised marking attendance for ' . $schedule->unit->code . ', ' . $schedule->cohort->code);
                } else {
                    return response('No active schedule found. Log in to create a schedule');
                }
            }
        }
        return response('Unauthorized');
    }

    /**
     * Function to add a card and check if it is a student or lecturer
     */
    public function card(Request $request)
    {
        // log the request
        Log::info($request);
        /**
         * Sample request
         * {
         *  "rfid_uid": "1234567890"
         * }
         */
        $rfid_uid = $request->card_uid;
        $card = Card::where('rfid_uid', $rfid_uid)->first();
        if ($card) {
            if ($card->status == 'pending') {
                return response('Card ' . $card->id . ' is already in system. Login to assign it to a user');
            } elseif ($card->status == 'assigned') {
                if ($card->role == 'student') {
                    $name = $card->student->name;
                    $ref = $card->student->registration_number;
                } elseif ($card->role == 'lecturer') {
                    $name = $card->lecturer->name;
                    $ref = $card->lecturer->staff_number;
                } else {
                    return response('Card ' . $card->id . ' is assigned to an unknown role');
                }
                $message = 'Card is already assigned to ' . $card->role . ' - ' . $name . ', ' . $ref;
                return response($message);
            } elseif ($card->status == 'suspended') {
                return response('Card ' . $card->id . ' is suspended. Contact the admin');
            }
        } else {
            // create a new card
            $card = new Card();
            $card->rfid_uid = $rfid_uid;
            $card->role = 'student';
            $card->status = 'pending';
            $card->save();
            return response('Card ' . $card->id . ' added successfully. Login to assign it to a user');
        }
        return response('Card Data received');
    }
}
