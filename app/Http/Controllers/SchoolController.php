<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Models\UserSchool;
use Illuminate\Http\Request;
use Str;

class SchoolController extends Controller
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
        // validate the request
        $request->validate(School::$rules);

        // create a slug from the name
        $slug = Str::slug($request->name);
        $i = 1;
        while (School::where("slug", $slug)->first()) {
            $slug = $slug."-".$i;
            $i++;
        }

        // create the school
        $school = School::create([
            "name"=> $request->name,
            "code"=> $request->code,
            "slug"=> $slug
        ]);

        // link user to the school
        $existingLink = UserSchool::where("user_id", auth()->user()->id)->where("school_id", $school->id)->first();
        if (! $existingLink) {
            UserSchool::create([
                "user_id"=> auth()->user()->id,
                "school_id"=> $school->id
            ]);
        }

        // redirect to the setup page
        return redirect()->route("setup")->with("success","School created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        //
    }
}
