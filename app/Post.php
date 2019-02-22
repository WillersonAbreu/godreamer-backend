<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function usuario()
    {
    	return $this->belongsTo('App\Usuario');
    }

}
