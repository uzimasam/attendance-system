<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Card
 *
 * @property int $id
 * @property string $rfid_uid
 * @property string $role
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 *
 * @property-read \App\Models\Student|null $student
 * @property-read \App\Models\User|null $lecturer
 * @property-read \App\Models\Student|null $student_status
 * @property-read \App\Models\User|null $lecturer_status
 */
class Card extends Model
{
    use SoftDeletes;

    protected $table = 'cards';

    protected $primaryKey = 'id';

    protected $fillable = [
        'rfid_uid',
        'role',
        'status'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    // Define constants for roles and statuses
    const ROLE_STUDENT = 'student';
    const ROLE_LECTURER = 'lecturer';

    const STATUS_PENDING = 'pending';
    const STATUS_ASSIGNED = 'assigned';
    const STATUS_SUSPENDED = 'suspended';

    /**
     * Get the student associated with the card.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function student()
    {
        return $this->hasOne(Student::class, 'rfid_uid', 'rfid_uid');
    }

    /**
     * Get the lecturer associated with the card.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function lecturer()
    {
        return $this->hasOne(User::class, 'rfid_uid', 'rfid_uid');
    }

    /**
     * Get the status of the student associated with the card.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function studentStatus()
    {
        return $this->belongsTo(Student::class, 'rfid_uid', 'rfid_uid')->select('status');
    }

    /**
     * Get the status of the lecturer associated with the card.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lecturerStatus()
    {
        return $this->belongsTo(User::class, 'rfid_uid', 'rfid_uid')->select('status');
    }

    /**
     * Scope a query to only include assigned cards.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAssigned($query)
    {
        return $query->where('status', self::STATUS_ASSIGNED);
    }

    /**
     * Scope a query to only include cards of a given role.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $role
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfRole($query, $role)
    {
        return $query->where('role', $role);
    }
}
