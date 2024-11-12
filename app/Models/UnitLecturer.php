<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitLecturer extends Model
{
    protected $table = 'unit_lecturers';

    protected $primaryKey = 'id';

    protected $fillable = [
        'unit_id',
        'lecturer_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }

    public function lecturer()
    {
        return $this->belongsTo(User::class, 'lecturer_id', 'id');
    }
}
