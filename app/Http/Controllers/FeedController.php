<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class FeedController extends Controller
{

    public function Index($id)
    {
        //Buscando dados do usuário pelo ID
        $usuario = DB::select('select * from usuarios as U where U.id = ?', [$id]);

        //Buscando dados dos amigos
        $amigos = DB::select(
            'select A.*, U.* from amigos as A inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?',
            [$id]
        );
        //Buscando dados dos posts e seus respectivos donos
        $post_amigos = DB::select(
            'select A.*, U.*, P.* from amigos as A inner join posts as P on P.usuario_id = A.id_usuario inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?',
            [$id]
        );
        //Buscando Post do usuario logado e seus dados
        $post = DB::select(
            'select U.*, P.* from usuarios as U inner join posts as P on P.usuario_id = U.id where U.id = ?',
            [$id]
        );

        if (!empty($post_amigos) && !empty($post) && !empty($usuario) && !empty($amigos)) {
            return response()->json()->with($post_amigos, $post, $usuario, $amigos); //return view('feed', compact('post_amigos', 'post', 'usuario', 'amigos'));
        } elseif (!empty($usuario)) {
            return response()->json(["sem amigos" => "Você não tem amigos, procure por um amigo", "usuario" => $usuario]); //redirect('/feed/' . $id)->with('semamigos','Você não tem amigos, busque um amigo!');
        } else {
            return response()->json(["error" => "Usuário não existe no banco de dados"]);
        }
    }

    public function getPostByUserId($id)
    {
        $userPosts = DB::select('select * from posts where usuario_id = ?', [$id]);

        return response()->json(["posts" => $userPosts]);
    }
}
