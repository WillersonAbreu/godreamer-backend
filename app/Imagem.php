<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imagem extends Model
{

  protected $table = 'imagens';

  protected $fillable = array(
    'usuario_id',
    'url_imagem'
  );


  public function post()
  {
    return $this->belongsTo('App\Post', 'imagem_id');
  }
}
