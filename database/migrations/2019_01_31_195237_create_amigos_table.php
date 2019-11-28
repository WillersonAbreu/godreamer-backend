<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAmigosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('amigos', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedBigInteger('id_usuario');
      $table->unsignedBigInteger('usuario_id');
      $table->timestamp('data_amizade')->useCurrent();
      $table->timestamps();
      // $table->foreign('id_usuario')
      // ->references('id')
      // ->on('usuarios');
      // $table->foreign('usuario_id')
      // ->references('id')
      // ->on('usuarios');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('amigos');
  }
}
