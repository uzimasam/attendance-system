<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Unit/Index', [
            'units' => Unit::all(),
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
        $request->validate(Unit::$rules);

        // create a slug from the name
        $slug = Str::slug($request->name);
        $i = 1;
        while (Unit::where('slug', $slug)->first()) {
            $slug = $slug.'-'.$i;
            $i++;
        }

        // create the unit
        Unit::create([
            'name' => $request->name,
            'code' => $request->code,
            'slug' => $slug,
            'school_id' => $request->school_id,
            'status' => 'active'
        ]);

        // redirect to the setup page
        return redirect()->route('setup')->with('success','Unit created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
