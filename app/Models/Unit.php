<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use SoftDeletes;

    protected $table = 'units';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'code',
        'slug',
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

    public function unitLecturers()
    {
        return $this->hasMany(UnitLecturer::class, 'unit_id', 'id');
    }

    public function lecturers()
    {
        return $this->hasManyThrough(User::class, UnitLecturer::class, 'unit_id', 'id', 'id', 'lecturer_id');
    }

    public function cohortUnits()
    {
        return $this->hasMany(CohortUnit::class, 'unit_id', 'id');
    }

    public function cohorts()
    {
        return $this->hasManyThrough(Cohort::class, CohortUnit::class, 'unit_id', 'id', 'id', 'cohort_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'unit_id', 'id');
    }
}