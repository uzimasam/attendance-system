<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cohort extends Model
{
    use SoftDeletes;

    protected $table = 'cohorts';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'code',
        'program_id',
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

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id', 'id');
    }

    public function cohortUnits()
    {
        return $this->hasMany(CohortUnit::class, 'cohort_id', 'id');
    }

    public function units()
    {
        return $this->hasManyThrough(Unit::class, CohortUnit::class, 'cohort_id', 'id', 'id', 'unit_id');
    }

    public function cohortStudents()
    {
        return $this->hasMany(CohortStudent::class, 'cohort_id', 'id');
    }

    public function students()
    {
        return $this->hasManyThrough(Student::class, CohortStudent::class, 'cohort_id', 'id', 'id', 'student_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'cohort_id', 'id');
    }

    public function doneSchedules()
    {
        return $this->hasMany(Schedule::class, 'cohort_id', 'id')->where('status', 'marked')->with('unit')->with('cohort');
    }

    public function averageAttendance()
    {
        $doneSchedules = $this->doneSchedules;
        $percentagePresent = 0;
        foreach ($doneSchedules as $schedule) {
            $percentagePresent += $schedule->percentagePresent();
        }
        $total = $doneSchedules->count();
        if ($total > 0){
            return number_format($percentagePresent / $total,2);
        }
        return 100;
    }
}
