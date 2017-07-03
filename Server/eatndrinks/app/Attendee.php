<?php

namespace eatndrink;

use Illuminate\Database\Eloquent\Model;

class Attendee extends Model
{
    protected $fillable = [
        'accepted', 'waiting', 'event_id', 'user_id'
    ];

    protected $hidden = [];

    public function events() {
        return $this->belongsToMany(\eatndrink\Event::class);
    }

    public function user() {
        return $this->belongsTo(\eatndrink\User::class, 'user_id', 'id');
    }
}
