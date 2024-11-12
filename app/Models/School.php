<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class School extends Model
{
    use SoftDeletes;

    protected $table = 'schools';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'code',
        'slug',
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

    public function userSchools()
    {
        return $this->hasMany(UserSchool::class, 'school_id', 'id');
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, UserSchool::class, 'school_id', 'id', 'id', 'user_id');
    }

    public function programs()
    {
        return $this->hasMany(Program::class, 'school_id', 'id');
    }
}
