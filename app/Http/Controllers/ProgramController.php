<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
use Str;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Program/Index', [
            'programs' => Program::all(),
        ]);
    }

    public function setup()
    {
        return Inertia::render('Setup/Index', [
            'schools' => School::all(),
            'programs' => Program::all(),
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
        Log::info($request->all());
        // validate the request
        $request->validate(Program::$rules);

        // create a slug from the name
        $slug = Str::slug($request->name);
        $i = 1;
        while (Program::where('slug', $slug)->first()) {
            $slug = $slug.'-'.$i;
            $i++;
        }

        // create the program
        Program::create([
            'name'=> $request->name,
            'code'=> $request->code,
            'slug'=> $slug,
            'duration'=> $request->duration,
            'semesters'=> $request->semesters,
            'school_id'=> $request->school_id
        ]);

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
