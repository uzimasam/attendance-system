<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('rfid_uid')->nullable()->unique();
            $table->enum('role', ['student', 'lecturer']);
            $table->enum('status', ['pending', 'assigned', 'suspended'])->default('pending');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('card_id')->nullable()->constrained('cards')->unique();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('card_id')->nullable()->constrained('cards')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropForeign(['card_id']);
            $table->dropColumn('card_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['card_id']);
            $table->dropColumn('card_id');
        });
        Schema::dropIfExists('cards');
    }
};
