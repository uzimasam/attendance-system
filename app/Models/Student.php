<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use SoftDeletes;

    protected $table = 'students';

    protected $primaryKey = 'id';

    protected $fillable = [
        'registration_number',
        'first_name',
        'last_name',
        'email',
        'phone',
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

    public function cohortStudents()
    {
        return $this->hasMany(CohortStudent::class, 'student_id', 'id');
    }

    public function cohorts()
    {
        return $this->hasManyThrough(Cohort::class, CohortStudent::class, 'student_id', 'id', 'id', 'cohort_id');
    }
}
