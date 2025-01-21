<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use SoftDeletes;

    protected $table = 'programs';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'code',
        'slug',
        'duration',
        'semesters',
        'school_id',
        'status'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public static $rules = [
        'name' => 'required|string',
        'code' => 'required|string|unique:programs',
        'duration' => 'required|integer|min:1',
        'semesters' => 'required|integer|min:1',
        'school_id' => 'required|integer|exists:schools,id'
    ];

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id', 'id');
    }

    public function cohorts()
    {
        return $this->hasMany(Cohort::class, 'program_id', 'id');
    }

    public function students()
    {
        return Student::whereHas('cohorts', function ($query) {
            $query->where('program_id', $this->id);
        })->distinct('id')->get();
    }

    public function schedules()
    {
        return $this->hasManyThrough(Schedule::class, Cohort::class, 'program_id', 'cohort_id', 'id', 'id');
    }
    public function units()
    {
        return $this->hasManyThrough(Unit::class, Schedule::class, 'cohort_id', 'id', 'id', 'unit_id')
            ->join('cohorts', 'cohorts.id', '=', 'schedules.cohort_id')
            ->where('cohorts.program_id', $this->id)
            ->distinct('units.id')
            ->select('units.*');
    }
    public function doneSchedules()
    {
        return $this->hasManyThrough(Schedule::class, Cohort::class, 'program_id', 'cohort_id', 'id', 'id')
            ->where('schedules.status', 'marked');
    }



    public function averageAttendance()
    {
        $doneSchedules = $this->doneSchedules;
        $percentagePresent = 0;
        foreach ($doneSchedules as $schedule) {
            $percentagePresent += $schedule->percentagePresent();
        }
        $total = $doneSchedules->count();
        if ($total > 0) {
            return number_format($percentagePresent / $total, 2);
        }
        return 100;
    }
}
