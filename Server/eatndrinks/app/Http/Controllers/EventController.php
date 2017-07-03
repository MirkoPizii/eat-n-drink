<?php

namespace eatndrink\Http\Controllers;

use Carbon\Carbon;
use eatndrink\Attendee;
use eatndrink\Event;
use eatndrink\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric|min:1',
            'description' => 'required|max:500',
            'latitude' => 'required',
            'longitude' => 'required',
            'user_uid_token' => 'required'
        ]);
        $event = Event::create(Input::all());
        $attendee = Attendee::create([
            'event_id' => $event->id,
            'user_id' => User::where('uid_token', '=', Input::get('user_uid_token'))->firstOrFail()->id,
            'accepted' => 1,
            'waiting' => 0
        ]);
        if($event && $attendee) {
            return response($status=200);
        }
        return response($status=400);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $event = Event::with('user')->findOrFail($id);
            $user_avg = User::findOrFail($event->user->id)->feedbacks_received()->avg('rating');
            $merge = array_merge($event->toArray(), ['rating' => round($user_avg)]);
            return response()->json($merge);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric|min:1',
            'description' => 'required|max:500',
        ]);
        try {
            $event = Event::findOrFail($id);
            $event->fill(Input::all());
            $event->save();
            return response()->json($event);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $event = Event::findOrFail($id);
            if($event->visible == 1)
                $event->visible = 0;
            else
                $event->visible = 1;
            $event->save();
            return response($status=200);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }

    public function list_cook_events(Request $request, $token) {
        $user = User::where('uid_token', '=', $token)->firstOrFail()->id;
        $myevents = Attendee::where([['user_id', '=', $user], ['accepted', '=', true]])
                            ->join('events', 'events.id', '=', 'attendees.event_id')
                            ->join('users', 'users.uid_token', '=', 'events.user_uid_token')
                            ->orderBy('date', 'desc')
                            ->limit(30)
                            ->get();
        return response()->json($myevents);
    }

    public function events_by_coords(Request $request, $latitude, $longitude, $km) {
        $events = DB::select(DB::raw('SELECT events.id, events.name, events.date, events.price, events.latitude, events.longitude, events.description, events.vegan, events.vegetarian, events.glutenfree, events.visible, users.uid_token, users.photoURL FROM events JOIN users ON events.user_uid_token = users.uid_token WHERE events.visible = 1 AND events.date >= "'. Carbon::today() .'" AND latitude BETWEEN ('.$latitude.' - ('.$km.'*0.018)) AND ('.$latitude.' + ('.$km.'*0.018)) AND longitude BETWEEN ('.$longitude.' - ('.$km.'*0.018)) AND ('.$longitude.' + ('.$km.'*0.018))'));
        $events = array_reverse($events);
        return response()->json($events);
    }

    public function confirmed_attendees_by_eventid($id) {
        try {
            $attendees = Attendee::with('user')->where([['event_id', '=', $id], ['accepted', '=', true]])->orderBy('updated_at', 'desc')->get()->toArray();
            foreach ($attendees as $key => $value) {
                $user_avg = User::findOrFail($value['user']['id'])->feedbacks_received()->avg('rating');
                if (is_null($user_avg)) {
                    $user_avg = 0;
                }
                $attendees[$key]['user'] = array_merge($attendees[$key]['user'], ['rating' => round($user_avg)]);
            }
            $attendees = array_reverse($attendees);
            return response()->json($attendees);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }

    public function request_attendees_by_eventid($id) {
        try {
            $attendees = Attendee::with('user')->where([['event_id', '=', $id], ['waiting', '=', true]])->get()->toArray();
            foreach ($attendees as $key => $value) {
                $user_avg = User::findOrFail($value['user']['id'])->feedbacks_received()->avg('rating');
                if (is_null($user_avg)) {
                    $user_avg = 0;
                }
                $attendees[$key]['user'] = array_merge($attendees[$key]['user'], ['rating' => round($user_avg)]);
            }
            $attendees = array_reverse($attendees);
            return response()->json($attendees);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }

}
