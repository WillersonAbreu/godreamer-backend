<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuariosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('usuarios', function (Blueprint $table) {
      $table->increments('id');
      $table->string('nome', 80);
      $table->string('email', 80);
      $table->string('senha');
      $table->string('token');
      $table->string('celular', 14)->unique();
      $table->datetime('data_nasc');
      $table->boolean('tipo_usuario');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('usuarios');
  }
}
