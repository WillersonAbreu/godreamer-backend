<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{   
    protected $primariKey = 'id_post';

    public function usuario()
    {
    	return $this->belongsTo('App\Usuario');
    }
    
    public function amigos()
    {
        return $this->hasMany('App\Amigo');
    }

    public function imagem()
    {
        return $this->hasOne('App\Imagem', 'id_img');
    }
}
