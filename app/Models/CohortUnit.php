<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CohortUnit extends Model
{
    protected $table = 'cohort_units';

    protected $primaryKey = 'id';

    protected $fillable = [
        'cohort_id',
        'unit_id'
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

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }
}
