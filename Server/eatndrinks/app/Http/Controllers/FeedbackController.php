<?php

namespace eatndrink\Http\Controllers;

use eatndrink\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class FeedbackController extends Controller
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
            'from_user_token' => 'required',
            'to_user_token' => 'required',
            'event_id' => 'required|numeric',
            'rating' => 'required|numeric'
        ]);

        $feedback = Feedback::where([['from_user_id', '=', Input::get('from_user_token')], ['to_user_id', '=', Input::get('to_user_token')], ['event_id', '=', Input::get('event_id')]]);

        if ($feedback->count() > 0) {
            $feedback->update(['rating' => Input::get('rating')]);
        } else {
            $feedback = Feedback::create([
                            'from_user_id' => Input::get('from_user_token'),
                            'to_user_id' => Input::get('to_user_token'),
                            'event_id' => Input::get('event_id'),
                            'rating' => Input::get('rating'),
                        ]);
        }

        if ($feedback) {
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
        //
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
