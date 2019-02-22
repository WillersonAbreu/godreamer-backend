<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
     public function usuario()
    {
    	return $this->belongsTo('App\Usuario');
    }
}
