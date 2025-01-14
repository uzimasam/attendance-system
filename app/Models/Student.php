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
        'card_id',
        'name',
        'email',
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
        'registration_number'=> 'string|required',
        'name'=> 'string|required',
        'email'=> 'email|required'
    ];

    public function card()
    {
        return $this->belongsTo(Card::class, 'card_id', 'id');
    }

    public function cohortStudents()
    {
        return $this->hasMany(CohortStudent::class, 'student_id', 'id');
    }

    public function cohorts()
    {
        return $this->hasManyThrough(Cohort::class, CohortStudent::class, 'student_id', 'id', 'id', 'cohort_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'student_id', 'id');
    }
}
