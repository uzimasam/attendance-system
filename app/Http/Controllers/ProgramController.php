<?php

namespace App\Http\Controllers;

use App\Models\Cohort;
use App\Models\Program;
use App\Models\School;
use App\Models\Unit;
use App\Models\UserSchool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($code)
    {
        $program = Program::where("code", $code)->first();
        if (!$program) {
            abort(404);
        }
        $program->load('units')->load('cohorts')->load('school')->load('schedules');
        $averageAttendance = $program->averageAttendance();
        $schedules = $program->schedules;
        $students = $program->students();
        return Inertia::render('Program/Index', [
            'averageAttendance' => $averageAttendance,
            'program' => $program,
            'schedules' => $schedules,
            'students'=> $students
        ]);
    }

    public function setup()
    {
        return Inertia::render('Setup/Index', [
            'schools' => School::all(),
            'units' => Unit::all(),
            'programs' => Program::all(),
            'cohorts' => Cohort::all()
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
        $request->validate(Program::$rules);

        // create a slug from the name
        $slug = Str::slug($request->name);
        $i = 1;
        while (Program::where('slug', $slug)->first()) {
            $slug = $slug.'-'.$i;
            $i++;
        }

        // link the user to the school
        $existingLink = UserSchool::where("user_id", auth()->user()->id)->where("school_id", $request->school_id)->first();
        if (! $existingLink) {
            UserSchool::create([
                "user_id"=> auth()->user()->id,
                "school_id"=> $request->school_id,
            ]);
        }

        // create the program
        $program = Program::create([
            'name'=> $request->name,
            'code'=> $request->code,
            'slug'=> $slug,
            'duration'=> $request->duration,
            'semesters'=> $request->semesters,
            'school_id'=> $request->school_id
        ]);

        // create the cohorts for the program
        for ($y = 1; $y <= $program->duration; $y++) {
            for ($s = 1; $s <= $program->semesters; $s++) {
                $name = $program->name." - Year ".$y." Sem ".$s;
                $code = $program->code."-Y".$y."-S".$s;
                Cohort::create([
                    'name'=> $name,
                    'code'=> $code,
                    'program_id'=> $program->id,
                    'status'=> 'active'
                ]);
            }
        }

        // redirect to the setup page
        return redirect()->route('setup')->with('success','Program created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Program $program)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Program $program)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        //
    }
}
