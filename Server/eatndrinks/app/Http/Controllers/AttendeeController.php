<?php

namespace eatndrink\Http\Controllers;

use eatndrink\Attendee;
use eatndrink\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AttendeeController extends Controller
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
            'event_id' => 'required|numeric',
            'user_token' => 'required',
        ]);
        $user_id = User::where('uid_token', '=', Input::get('user_token'))->firstOrFail()->id;
        $attendee = Attendee::where([['user_id', '=', $user_id], ['event_id', '=', Input::get('event_id')]]);

        if ($attendee->count() > 0) {
            $attendee->update(['waiting' => true]);
        } else {
            $attendee = Attendee::create([
                            'event_id' => Input::get('event_id'),
                            'user_id' => $user_id
                        ]);
        }

        if($attendee) {
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
        //
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
            'action' => 'required',
        ]);
        try {
            $attendee = Attendee::findOrFail($id);

            if (Input::get('action') === 'accept') {
                $attendee->accepted = true;
                $attendee->waiting = false;
                $attendee->save();
            } else if (Input::get('action') === 'refuse') {
                $attendee->accepted = false;
                $attendee->waiting = false;
                $attendee->save();
            }
            return response($status=200);
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
        //
    }
}
