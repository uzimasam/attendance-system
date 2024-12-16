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
        Schema::table("students", function (Blueprint $table) {
            $table->dropColumn("first_name");
            $table->dropColumn("last_name");
            $table->dropColumn("phone");
            $table->string('name')->after('registration_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->string('first_name')->after('registration_number');
            $table->string('last_name')->after('first_name');
            $table->string('phone')->after('last_name')->unique();
            $table->dropColumn('name');
        });
    }
};
