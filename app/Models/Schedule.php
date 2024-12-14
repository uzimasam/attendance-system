<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use SoftDeletes;

    protected $table = 'schedules';

    protected $primaryKey = 'id';

    protected $fillable = [
        'attendance_link',
        'unit_id',
        'cohort_id',
        'day',
        'start_time',
        'end_time',
        'venue',
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
        'unit_id' => 'required|integer|exists:units,id',
        'cohort_id' => 'required|integer|exists:cohorts,id',
        'day' => 'required|string',
        'start_time' => 'required|string',
        'end_time' => 'required|string',
        'venue' => 'required|string'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }

    public function cohort()
    {
        return $this->belongsTo(Cohort::class, 'cohort_id', 'id');
    }
}
