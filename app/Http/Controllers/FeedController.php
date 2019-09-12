<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Post;
use Illuminate\Http\Request;

class FeedController extends Controller{
  function __construct(Request $request){
     /* if (!$request->session()->exists('id'))
      {
          return redirect('/')->with('naologado', 'Você precisa fazer login!');
      }
     */
  }

  public function Index($id){
    //Buscando dados do usuário pelo ID
    $usuario = DB::select('select * from usuarios as U where U.id = ?', [$id]);

    //Buscando dados dos amigos
    $amigos = DB::select('select A.*, U.* from amigos as A inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?', [$id]);
    //Buscando dados dos posts e seus respectivos donos
    $post_amigos = DB::select('select A.*, U.*, P.* from amigos as A inner join posts as P on P.usuario_id = A.id_usuario inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?', [$id]);
    //Buscando Post do usuario logado e seus dados
    $post = DB::select('select U.*, P.* from usuarios as U inner join posts as P on P.usuario_id = U.id where U.id = ?', [$id]);

    if (isset($post_amigos) && isset($post) && isset($usuario) && isset($amigos)){
      return view('feed', compact('post_amigos', 'post', 'usuario', 'amigos'));
    }
    elseif (isset($usuario)){
      return redirect('/feed/' . $id)->with('semamigos','Você não tem amigos, busque um amigo!');
    }
  }
}



