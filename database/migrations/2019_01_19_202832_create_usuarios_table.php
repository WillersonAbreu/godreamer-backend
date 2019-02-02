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
        Schema::create('usuarios', function (Blueprint $table){
            $table->increments('id');
            $table->string('nome', 80);
            $table->string('email', 80);
            $table->string('senha',);
            $table->string('endereco', 200);
            $table->string('celular', 14)->unique();
            $table->datetime('data_nasc');
            $table->string('rg', 13)->unique();
            $table->string('cpf', 13)->unique();
            $table->boolean('tipo_usuario');
            $table->string('remember_token', 100)->nullable();
            $table->softDeletes();
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
