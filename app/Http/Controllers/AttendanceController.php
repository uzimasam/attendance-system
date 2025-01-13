<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Card;
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
        $rfid_uid = $request->rfid_uid;
        $card = Card::where('rfid_uid', $rfid_uid)->first();
        if ($card) {
            if ($card->status == 'pending') {
                return response()->json(['message' => 'Card is already in system. Login to assign it to a user']);
            } elseif ($card->status == 'assigned') {
                if ($card->role = 'student') {
                    $name = $card->student->name;
                    $ref = $card->student->registration_number;
                } elseif ($card->role = 'lecturer') {
                    $name = $card->lecturer->name;
                    $ref = $card->lecturer->staff_number;
                } else {
                    return response()->json(['message' => 'Card is assigned to an unknown role']);
                }
                $message = 'Card is already assigned to ' . $card->role .' - '. $name .', '.$ref;
                return response()->json(['message' => $message]);
            } elseif ($card->status == 'suspended') {
                return response()->json(['message' => 'Card is suspended. Contact the admin']);
            }
        } else {
            // create a new card
            $card = new Card();
            $card->rfid_uid = $rfid_uid;
            $card->role = 'student';
            $card->status = 'pending';
            $card->save();
            return response()->json(['message'=> 'Card added successfully. Login to assign it to a user']);
        }
        return response()->json(['message' => 'Card Data received']);
    }
}
