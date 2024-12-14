<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("schedules", function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
        });
        Schema::table("attendances", function (Blueprint $table) {
            $table->dropForeign(['cohort_student_id']);
            $table->dropColumn("cohort_student_id");
            $table->dropForeign(['unit_id']);
            $table->dropColumn("unit_id");
            $table->dropColumn("attendance_date");
            $table->foreignId('student_id')->constrained('students');
            $table->foreignId('schedule_id')->constrained('schedules');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropForeign(['schedule_id']);
            $table->dropColumn('student_id');
            $table->dropColumn('schedule_id');
            $table->foreignId('cohort_student_id')->constrained('cohort_students');
            $table->foreignId('unit_id')->constrained('units');
            $table->datetime('attendance_date')->default(now());
        });
    }
};
