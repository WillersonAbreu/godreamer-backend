<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
    protected $primaryKey = 'id_amizade';

    public function usuario()
    {
        return $this->belongsTo('App\Usuario');
    }

    public function posts()
    {
        return $this->belongsTo('App\Post');
    }
}
