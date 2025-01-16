<?php

namespace App\Models;

use Carbon\Carbon;
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
        'card_id',
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

    public function card()
    {
        return $this->belongsTo(Card::class, 'card_id', 'id');
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

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'user_id', 'id');
    }

    public function todaySchedules()
    {
        return $this->hasMany(Schedule::class, 'user_id', 'id')->whereDate('day', now()->format('Y-m-d'));
    }

    public function yesterdaySchedules()
    {
        return $this->hasMany(Schedule::class, 'user_id', 'id')->whereDate('day', now()->subDay()->format('Y-m-d'));
    }

    public function upcomingSchedules()
    {
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format('H:i:s');
    
        return $this->hasMany(Schedule::class, 'user_id', 'id')
        ->with('unit') // Eager load the unit relationship
        ->whereIn('status', ['active', 'marking'])
            ->whereIn('status', ['active', 'marking'])
            ->where(function ($query) use ($currentDate, $currentTime) {
                $query->whereDate('day', '>', $currentDate)
                    ->orWhere(function ($query) use ($currentDate, $currentTime) {
                        $query->whereDate('day', $currentDate)
                            ->whereTime('start_time', '>', $currentTime);
                    });
            });
    }

    public function missedSchedules()
    {
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format('H:i:s');

        return $this->hasMany(Schedule::class, 'user_id', 'id')
            ->with('unit') // Eager load the unit relationship
            ->whereIn('status', ['active'])
            ->where(function ($query) use ($currentDate, $currentTime) {
                $query->whereDate('day', '<', $currentDate)
                    ->orWhere(function ($query) use ($currentDate, $currentTime) {
                        $query->whereDate('day', $currentDate)
                            ->whereTime('end_time', '<', $currentTime);
                    });
            });
    }
    public function doneSchedules()
    {
        return $this->hasMany(Schedule::class, 'user_id', 'id')->where('status', 'marked');
    }
}
