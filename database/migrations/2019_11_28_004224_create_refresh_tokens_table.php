<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefreshTokensTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('refresh_tokens', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('token_id');
      $table->text('refresh_token');
      $table->tinyInteger('is_active')->default(1);
      $table->foreign('token_id')->references('id')->on('tokens')->onUpdate('cascade')->onDelete('cascade');
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
    Schema::dropIfExists('refresh_tokens');
  }
}
