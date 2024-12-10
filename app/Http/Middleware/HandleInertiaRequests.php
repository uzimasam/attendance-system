<?php

namespace App\Http\Middleware;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // create a schools array to be shared with all pages
        /*
            {
                id: '1',
                name: 'School of Computing',
                programs: [
                    {
                        id: '1',
                        name: 'Computer Science',
                        code: 'CS',
                        units: [
                            { id: '1', name: 'Programming 101', cohorts: ['Year 1 2024', 'Year 2 2023'] },
                            { id: '2', name: 'Data Structures', cohorts: ['Year 2 2023'] }
                        ]
                    }
                ]
            }
        */
        $schools = School::with('programs.units.cohorts')->get()->map(function ($school) {
            return [
                'id' => $school->id,
                'name' => $school->name,
                'programs' => $school->programs->map(function ($program) {
                    return [
                        'id' => $program->id,
                        'name' => $program->name,
                        'code' => $program->code,
                        'units' => $program->units->map(function ($unit) {
                            return [
                                'id' => $unit->id,
                                'name' => $unit->name,
                                'cohorts' => $unit->cohorts->map(function ($cohort) {
                                    return $cohort->name;
                                })
                            ];
                        })
                    ];
                })
            ];
        });
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'schools' => $schools
        ];
    }
}
