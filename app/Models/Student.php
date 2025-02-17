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

    public function getCurrentCohort()
    {
        return $this->cohortStudents()->orderBy('created_at', 'asc')->first();
    }

    public function getCurrentCohortBySchool($school_id)
    {
        $cohort = null;
        $programs = Program::where('school_id', $school_id)->get();
        foreach ($programs as $program) {
            $cohort = $this->cohortStudents()->whereHas('cohort', function ($query) use ($program) {
                $query->where('program_id', $program->id);
            })->orderBy('created_at', 'asc')->first();
            if ($cohort) {
                break;
            }
        }
        if ($cohort) {
            return $cohort;
        }
        return $this->cohortStudents()->orderBy('created_at', 'asc')->first();
    }

    public function cohorts()
    {
        return $this->hasManyThrough(Cohort::class, CohortStudent::class, 'student_id', 'id', 'id', 'cohort_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'student_id', 'id');
    }

    public function schedules()
    {
        return $this->hasManyThrough(Schedule::class, Attendance::class, 'student_id', 'id', 'id', 'schedule_id');
    }

    public function markedSchedule()
    {
        return $this->schedules->where('status', 'marked');
    }

    public function markedAttendance()
    {
        return $this->attendances->where('schedule.status', 'marked');
    }

    public function presentAttendance()
    {
        return $this->markedAttendance()->where('attendance_status', 'present');
    }

    public function absentAttendance()
    {
        return $this->markedAttendance()->where('attendance_status', 'absent');
    }

    public function excusedAttendance()
    {
        return $this->markedAttendance()->where('attendance_status', 'excused');
    }

    public function averageAttendance()
    {
        $total = $this->markedAttendance()->count();
        $absent = $this->absentAttendance()->count();

        if ($total == 0) {
            return 100;
        }

        return 100 - (($absent / $total) * 100);
    }

    public function previousWeekAverageAttendance()
    {
        $date = now()->subWeek();
        $total = $this->markedAttendance()->where('created_at', '<=', $date)->count();
        $absent = $this->absentAttendance()->where('created_at', '<=', $date)->count();

        if ($total == 0) {
            return 100;
        }

        return 100 - (($absent / $total) * 100);
    }

    public function units()
    {
        $scheduleIds = $this->schedules->pluck('unit_id');
        $scheduleIds = $scheduleIds->unique();
        return Unit::whereIn('id', $scheduleIds)->get();
    }

    public function averageUnitAttendance($unit_id)
    {
        $markedUnitSchedules = $this->markedSchedule()->where('unit_id', $unit_id);
        $total = 0;
        $absent = 0;
        foreach ($markedUnitSchedules as $schedule) {
            $attendance = $this->attendances()->where('schedule_id', $schedule->id)->first();
            if ($attendance) {
                $total++;
                if ($attendance->attendance_status == 'absent') {
                    $absent++;
                }
            }
        }

        if ($total == 0) {
            return 100;
        }

        return 100 - (($absent / $total) * 100);
    }

    public function flaggedUnits()
    {
        $units = $this->units();
        $flagged = [];
        foreach ($units as $unit) {
            $average = $this->averageUnitAttendance($unit->id);
            if ($average < 80) {
                $flagged[] = $unit;
            }
        }
        return $flagged;
    }

    public function scheduleData()
    {
        $data = [];
        $schedules = $this->schedules;
        foreach ($schedules as $schedule) {
            $attendance = $this->attendances()->where('schedule_id', $schedule->id)->first();
            if ($attendance) {
                $attendance_status = $attendance->attendance_status;
            } else {
                $attendance_status = 'unmarked';
            }
            if ($attendance_status != 'pending') {
                $data[] = [
                    'unit' => $schedule->unit->name,
                    'cohort' => $schedule->cohort->name,
                    'topic' => $schedule->topic ?? 'N/A',
                    'day' => date('jS M, Y', strtotime($schedule->day)),
                    'time' => date('h:i A', strtotime($schedule->start_time)) . ' - ' . date('h:i A', strtotime($schedule->end_time)),
                    'venue' => $schedule->venue,
                    'status' => ucfirst($attendance_status)
                ];
            }
        }
        return $data;
    }
}
