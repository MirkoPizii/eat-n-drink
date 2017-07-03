<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return 'Silence is golden :-)';
});

Route::get('event/events-as-cook/{token}', 'EventController@list_cook_events');
Route::get('event/events-as-attendee/{token}', 'EventController@list_attendee_events');
Route::get('event/coords/{latitude}/{longitude}/{km}', 'EventController@events_by_coords');
Route::get('event/{id}/confirmed_attendees', 'EventController@confirmed_attendees_by_eventid');
Route::get('event/{id}/request_attendees', 'EventController@request_attendees_by_eventid');
Route::resource('event', 'EventController');
Route::resource('user', 'UserController');
Route::resource('attendee', 'AttendeeController');
Route::resource('feedback', 'FeedbackController');
