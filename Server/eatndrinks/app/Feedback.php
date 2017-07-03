<?php

namespace eatndrink;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'rating', 'from_user_id', 'to_user_id', 'event_id'
    ];

    protected $hidden = [];

    public function user() {
        return $this->belongsTo(\eatndrink\User::class);
    }

    public function event() {
        return $this->hasOne(\eatndrink\Event::class);
    }
}
