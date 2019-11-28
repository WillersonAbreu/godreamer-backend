<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
  protected $fillable = array(
    'nome',
    'email',
    'senha',
    'celular',
    'data_nasc',
    'tipo_usuario'
  );

  public function posts()
  {
    return $this->hasMany('App\Post');
  }

  public function amigos()
  {
    return $this->hasMany('App\Amigo');
  }

  public function imagens()
  {
    return $this->hasMany('App\Imagem');
  }
}
