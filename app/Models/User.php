<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'staff_number',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function userSchools()
    {
        return $this->hasMany(UserSchool::class, 'user_id', 'id');
    }

    public function schools()
    {
        return $this->hasManyThrough(School::class, UserSchool::class, 'user_id', 'id', 'id', 'school_id');
    }

    public function unitLecturers()
    {
        return $this->hasMany(UnitLecturer::class, 'lecturer_id', 'id');
    }

    public function units()
    {
        return $this->hasManyThrough(Unit::class, UnitLecturer::class, 'lecturer_id', 'id', 'id', 'unit_id');
    }
}
