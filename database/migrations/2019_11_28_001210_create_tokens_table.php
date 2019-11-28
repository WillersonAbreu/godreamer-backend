<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTokensTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('tokens', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedBigInteger('usuarios_id');
      $table->string('token', 1000);
      $table->string('refresh_token', 1000);
      $table->datetime('expired_at');
      $table->timestamps();
      $table->foreign('usuarios_id')->references('id')->on('usuarios');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('tokens');
  }
}
