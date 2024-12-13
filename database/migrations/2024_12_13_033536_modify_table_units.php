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
        Schema::table('units', function (Blueprint $table) {
            // remove the foreign key constraint
            $table->dropForeign(['program_id']);
            $table->dropColumn('program_id');
            $table->foreignId('school_id')->constrained('schools');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('units', function (Blueprint $table) {
            $table->dropForeign(['school_id']);
            $table->dropColumn('school_id');
            $table->foreignId('program_id')->constrained('programs');
        });
    }
};
