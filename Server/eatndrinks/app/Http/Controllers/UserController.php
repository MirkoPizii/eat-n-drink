<?php

namespace eatndrink\Http\Controllers;

use eatndrink\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

class UserController extends Controller
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
            'displayName' => 'required',
            'photoURL' => 'required',
            'email' => 'required',
            'uid_token' => 'required'
        ]);
        try {
            $user = User::where('uid_token', '=', $request->get('uid_token'))->orWhere('email', '=', $request->get('email'))->firstOrFail();
        } catch (\Exception $e) {
            $user = User::create(Input::all());
        }
        return response($status=200);
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

    public function avg($id) {
        try {
            $user_avg = User::findOrFail($id)->feedbacks_received->avg('rating');
            return response()->json($user_avg);
        } catch (\Exception $e) {
            return response($status=404);
        }
    }
}
