<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Log;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        Log::info("Request: " . json_encode($request->all()));
        $students = $request->data;
        foreach ($students as $student) {
            // check if student exists
            $existingStudent = Student::where('registration_number', $student['regNo'])->first();
            if ($existingStudent) {
                $existingStudent->name = $student['name'];
                $existingStudent->email = $student['email'];
                $existingStudent->save();
            } else {
                Student::create([
                    'registration_number' => $student['regNo'],
                    'name' => $student['name'],
                    'email' => $student['email']
                ]);
            }
        }

        return redirect()->route('setup')->with('success','Program created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
