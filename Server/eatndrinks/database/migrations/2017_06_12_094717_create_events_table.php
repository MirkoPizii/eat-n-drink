<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('user_uid_token');
            $table->foreign('user_uid_token')->references('uid_token')->on('users');
            $table->string('name');
            $table->timestamp('date');
            $table->integer('price')->default(0);
            $table->float('latitude', 10, 6);
            $table->float('longitude', 10, 6);
            $table->longText('description');
            $table->boolean('vegan')->default(false);
            $table->boolean('vegetarian')->default(false);
            $table->boolean('glutenfree')->default(false);
            $table->boolean('visible')->default(true);
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
