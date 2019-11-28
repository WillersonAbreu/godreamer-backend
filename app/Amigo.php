<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
  protected $fillable = array(
    'id_usuario',
    'usuario_id',
    'data_amizade'
  );

  public function usuario()
  {
    return $this->belongsTo('App\Usuario');
  }

  public function posts()
  {
    return $this->belongsTo('App\Post');
  }
}
