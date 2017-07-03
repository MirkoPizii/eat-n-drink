<?php

namespace eatndrink;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    const CREATED_AT = 'date';

    protected $fillable = [
        'name', 'date', 'price', 'latitude', 'longitude', 'description', 'vegan', 'vegetarian', 'glutenfree', 'visible', 'user_uid_token'
    ];

    protected $hidden = [];

    public function user() {
        return $this->belongsTo(\eatndrink\User::class, 'user_uid_token', 'uid_token');
    }

    public function attendees() {
        return $this->hasMany(\eatndrink\Attendee::class);
    }
}
