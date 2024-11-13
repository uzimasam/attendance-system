<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use SoftDeletes;

    protected $table = 'attendances';

    protected $primaryKey = 'id';

    protected $fillable = [
        'cohort_student_id',
        'unit_id',
        'attendance_date',
        'attendance_status'
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

    public function cohortStudent()
    {
        return $this->belongsTo(CohortStudent::class, 'cohort_student_id', 'id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }

    public function cohort()
    {
        return $this->belongsToThrough(Cohort::class, CohortStudent::class, 'id', 'cohort_id', 'cohort_student_id', 'id');
    }

    public function student()
    {
        return $this->belongsToThrough(User::class, CohortStudent::class, 'id', 'student_id', 'cohort_student_id', 'id');
    }
}
