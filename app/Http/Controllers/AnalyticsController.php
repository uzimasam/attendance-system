<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Schedule;
use App\Models\School;
use App\Models\Student;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;

class AnalyticsController extends Controller
{
    private const TIME_FORMAT = 'H:i:s';

    public static function generateBlueShades(int $count, int $minBrightness = 90, int $maxBrightness = 255): array
    {
        $shades = [];
        $step = ($maxBrightness - $minBrightness) / ($count - 1);

        for ($i = 0; $i < $count; $i++) {
            $brightness = round($minBrightness + ($step * $i));
            $red = round($brightness * 0.3);
            $green = round($brightness * 0.5);
            $blue = $brightness;

            $shades[] = sprintf("#%02x%02x%02x", $red, $green, $blue);
        }

        return $shades;
    }

    public static function randomBlueShade(int $minBrightness = 90, int $maxBrightness = 255): string
    {
        $brightness = rand($minBrightness, $maxBrightness);
        
        $red = round($brightness * 0.3);
        $green = round($brightness * 0.5);
        $blue = $brightness;

        return sprintf("#%02x%02x%02x", $red, $green, $blue);
    }

    public static function calculateAverageAttendance(Collection $doneSchedules): float
    {
        if ($doneSchedules->isEmpty()) {
            return 100;
        }

        $totalPercentage = $doneSchedules->sum(function ($schedule) {
            return 100 - $schedule->percentageAbsent();
        });

        return round($totalPercentage / $doneSchedules->count(), 2);
    }

    private function getScheduleAnalytics(): array
    {
        $now = Carbon::now();
        $currentDate = $now->format('Y-m-d');
        $currentTime = $now->format(self::TIME_FORMAT);

        $schedules = Schedule::with(['unit', 'cohort'])->get();
        
        // Keep done schedules as collection for percentage calculation
        $doneSchedules = $schedules->where('status', 'marked');
        
        return [
            'today' => $schedules->filter(fn($schedule) =>
                Carbon::parse($schedule->day)->isToday()
            )->count(),

            'yesterday' => $schedules->filter(fn($schedule) =>
                Carbon::parse($schedule->day)->isYesterday()
            )->count(),

            'upcoming' => $schedules->filter(fn($schedule) =>
                $schedule->status === 'active' &&
                (Carbon::parse($schedule->day)->format('Y-m-d') > $currentDate ||
                 Carbon::parse($schedule->start_time)->format(self::TIME_FORMAT) > $currentTime ||
                 Carbon::parse($schedule->start_time)->format(self::TIME_FORMAT) > $currentTime)
            )->values()->toArray(),

            'done' => $doneSchedules, // Keep as collection

            'missed' => $schedules->filter(fn($schedule) =>
                $schedule->status === 'active' &&
                (Carbon::parse($schedule->day)->format('Y-m-d') < $currentDate ||
                 Carbon::parse($schedule->end_time)->format(self::TIME_FORMAT) < $currentTime ||
                 Carbon::parse($schedule->end_time)->format(self::TIME_FORMAT) < $currentTime)
            )->values()->toArray(),

            'doneByLastWeekAndBefore' => $doneSchedules->filter(function ($schedule) use ($now) {
                return Carbon::parse($schedule->day)->lte($now->subWeek());
            }),

            'inProgress' => $schedules->where('status', 'in_progress')->values()->toArray()
        ];
    }

    private function getStudentAnalytics(): array
    {
        $students = Student::all();
        $flagged = 0;
        $flaggedStudents = [];
        foreach ($students as $student) {
            if($student->averageAttendance() < 80) {
                $flagged++;
                $flaggedStudents[] = [
                    'id' => $student->id,
                    'registration_number' => $student->registration_number,
                    'name' => $student->name,
                    'school' => $student->getCurrentCohort()->cohort->program->school->code,
                    'program' => $student->getCurrentCohort()->cohort->program->name,
                    'cohort' => $student->getCurrentCohort()->cohort->code,
                    'attendance' => number_format($student->averageAttendance(), 2).'%'
                ];
            }
        }
        // order by average attendance
        return [
            'total' => $students->count(),
            'flaggedStudents' => $flaggedStudents,
            'flagged' => $flagged
        ];
    }

    private function getLecturerAnalytics(): array
    {
        // Retrieve lecturers and load their cards
        $lecturers = User::where('role', 'lecturer')->get();

        // get the average attendance of all lecturers
        $averageAttendance = $lecturers->sum(function ($lecturer) {
            return $lecturer->averageAttendance();
        });

        return [
            'total' => $lecturers->count(),
            'averageAttendance' => number_format($averageAttendance / $lecturers->count(), 2)
        ];


    }

    private function getSchoolComparisonChart(): array
    {
        $schools = School::all();
        $schoolData = [];
        $shades = self::generateBlueShades($schools->count());

        foreach ($schools as $index => $school) {
            $schoolData[] = [
                'code' => $school->code,
                'attendance' => $school->averageAttendance(),
                'color' => $shades[$index]
            ];
        }

        return $schoolData;
    }

    private function transformToChartData(array $data): array 
    {
        $chartData = [];
        $dataPoint = ['month' => 'All-Time'];
        
        foreach ($data as $school) {
            $code = strtolower($school['code']);
            $dataPoint[$code] = $school['attendance'];
        }
        
        $chartData[] = $dataPoint;
        
        return $chartData;
    }

    private function generateChartConfig(array $schoolData): array 
    {
        $chartConfig = [];
        
        foreach ($schoolData as $school) {
            $code = strtolower($school['code']);
            $chartConfig[$code] = [
                'label' => $code,
                'color' => $school['color']
            ];
        }
        return $chartConfig;
    }

    public function index()
    {
        $scheduleAnalytics = $this->getScheduleAnalytics();
        $studentAnalytics = $this->getStudentAnalytics();
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format(self::TIME_FORMAT);
        
        // Calculate average attendance before converting to array
        $averageAttendance = $this->calculateAverageAttendance($scheduleAnalytics['done']);

        // do a comparison of the average attendance of the last week
        $averageAttendanceLastWeek = $this->calculateAverageAttendance($scheduleAnalytics['doneByLastWeekAndBefore']);
        $averageAttendanceDifference = $averageAttendance - $averageAttendanceLastWeek;
        $rateOfChange = $averageAttendanceDifference / $averageAttendanceLastWeek * 100;
        
        return Inertia::render('Analytics/Index', [
            'lecturerCount' => $this->getLecturerAnalytics()['total'],
            'lecturerAverageAttendance' => $this->getLecturerAnalytics()['averageAttendance'],
            'averageAttendance' => $averageAttendance,
            'yesterdayScheduleCount' => $scheduleAnalytics['yesterday'],
            'unitCount' => Unit::count(),
            'todayScheduleCount' => $scheduleAnalytics['today'],
            'studentCount' => $studentAnalytics['total'],
            'schoolCount' => School::count(),
            'programCount' => Program::count(),
            'flaggedStudentCount' => $studentAnalytics['flagged'],
            'flaggedStudents' => $studentAnalytics['flaggedStudents'],
            'activeScheduleCount' => Schedule::where('status', 'active')
            ->where('status', 'active')
            ->where(function ($query) use ($currentDate, $currentTime) {
                $query->whereDate('day', '>', $currentDate)
                    ->orWhere(function ($query) use ($currentDate, $currentTime) {
                        $query->whereDate('day', $currentDate)
                            ->whereTime('start_time', '>', $currentTime);
                    });
            })->count(),
            'schoolComparisonChartData' => $this->transformToChartData($this->getSchoolComparisonChart()),
            'schoolComparisonChartConfig' => $this->generateChartConfig($this->getSchoolComparisonChart()),
            'rateOfChange' => number_format($rateOfChange, 2)
        ]);
    }
}
