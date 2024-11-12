<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CohortStudent extends Model
{
    protected $table = 'cohort_students';

    protected $primaryKey = 'id';

    protected $fillable = [
        'cohort_id',
        'student_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function cohort()
    {
        return $this->belongsTo(Cohort::class, 'cohort_id', 'id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }
}
