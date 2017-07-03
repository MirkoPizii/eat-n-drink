<?php

namespace eatndrink;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'displayName', 'photoURL', 'email', 'provider', 'uid_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function events() {
        return $this->hasMany(\eatndrink\Event::class);
    }

    public function attendees() {
        return $this->hasOne(\eatndrink\Attendee::class);
    }

    public function feedbacks_received() {
        return $this->hasMany(\eatndrink\Feedback::class, 'to_user_id', 'uid_token');
    }

    public function feedbacks_sent() {
        return $this->hasMany(\eatndrink\Feedback::class, 'from_user_id', 'uid_token');
    }
}
