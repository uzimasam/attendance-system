<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create a new enum type with the additional values
        DB::statement("CREATE TYPE schedule_status AS ENUM ('active', 'inactive', 'marking', 'marked')");

        // Alter the column to use the new enum type
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('schedules', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive', 'marking', 'marked'])->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert the changes
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('schedules', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
        });

        // Drop the new enum type
        DB::statement("DROP TYPE schedule_status");
    }
};
