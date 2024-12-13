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

    public function units()
    {
        return $this->hasManyThrough(Unit::class,CohortUnit::class,'cohort_id','id','id','unit_id')->join('cohorts', 'cohort_units.cohort_id', '=', 'cohorts.id')->where('cohorts.program_id', $this->id);
    }

    public function cohorts()
    {
        return $this->hasMany(Cohort::class, 'program_id', 'id');
    }
}
