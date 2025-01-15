<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
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
            'unitCount' => $unitCount,
            'yesterdayScheduleCount' => $yesterdayScheduleCount
        ]);
    }

    public function printLecturers()
    {
        // Retrieve lecturers and load their cards
        $lecturers = User::where('role', 'lecturer')->with('card')->get();

        // Separate lecturers with and without cards
        $lectWithCard = $lecturers->filter(function ($lecturer) {
            return $lecturer->card !== null;
        });

        $lectWithoutCard = $lecturers->filter(function ($lecturer) {
            return $lecturer->card === null;
        });

        // Retrieve pending cards
        $cards = Card::where('status', 'pending')->get();

        return Inertia::render('Print/Lecturers', [
            'cards' => $cards,
            'lectWithCard' => $lectWithCard,
            'lectWithoutCard' => $lectWithoutCard,
        ]);
    }

    public function addCard(Request $request)
    {
        Log::info('Adding card');
        Log::info($request->all());
        // validate the request
        $request->validate([
            'cardId' => 'required|exists:cards,id',
            'lecturerId'=> 'required|exists:users,id'
        ]);
        
        // get the card
        $card = Card::find($request->cardId);
        if ($card === null) {
            Log::error('Card not found');
            return redirect(route('printing.lecturers'))->with('error', 'Card not found');
        }

        // get the lecturer
        $lecturer = User::find($request->lecturerId);
        if ($lecturer === null) {
            Log::error('Lecturer not found');
            return redirect(route('printing.lecturers'))->with('error','Lecturer not found');
        }
        $lecturer->card_id = $card->id;
        $lecturer->save();

        $card->status = 'assigned';
        $card->role = 'lecturer';
        $card->save();

        return redirect(route('printing.lecturers'))->with('success','Card assigned to Lecturer Successfully');
    }

    public function swapCard(Request $request)
    {
        Log::info('Swapping card');
        Log::info($request->all());

        $request->validate([
            'cardId' => 'required|exists:cards,id',
            'lecturerId'=> 'required|exists:users,id'
        ]);

        $card = Card::find($request->cardId);
        if ($card === null) {
            Log::error('Card not found');
            return redirect(route('printing.lecturers'))->with('error', 'Card not found');
        }

        $lecturer = User::find($request->lecturerId);
        if ($lecturer === null) {
            Log::error('Lecturer not found');
            return redirect(route('printing.lecturers'))->with('error','Lecturer not found');
        }

        $oldCard = $lecturer->card;
        $oldCard->status = 'suspended';
        $oldCard->save();

        $lecturer->card_id = $card->id;
        $lecturer->save();

        $card->status = 'assigned';
        $card->role = 'lecturer';
        $card->save();

        return redirect(route('printing.lecturers'))->with('success','Lecturer card swapped successfully');
    }

    public function printStudents()
    {
        $students = Student::with('card')->get();

        $studentWithCard = $students->filter(function ($student) {
            return $student->card !== null;
        });

        $studentWithoutCard = $students->filter(function ($student) {
            return $student->card === null;
        });

        $cards = Card::where('status', 'pending')->get();

        return Inertia::render('Print/Students', [
            'cards' => $cards,
            'studentWithCard'=> $studentWithCard,
            'studentWithoutCard'=> $studentWithoutCard
        ]);
    }
}
