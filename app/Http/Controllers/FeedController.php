<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Usuario;
use App\Post;
use App\Amigo;

use Illuminate\Http\Request;

class FeedController extends Controller
{   
    public function Index($id)
    {   
        //Buscando os posts do usuário
       // $posts = Post::where('usuario_id', $id)->orderBy('data_post', 'desc')->get();   

/////////////////////////////////////////////////////////        
       // $amigos = DB::table('amigos')->where('usuario_id', $id)->get();
////////////////////////////////////////////////////////

        //Buscando dados do usuário pelo ID
        $usuario = Usuario::where('id', $id)->with(['posts', 'amigos'])->get();

        if (isset($usuario)) 
        {            
            return view('feed', array(
                'usuario' => $usuario
          ));
        }
        else 
        {            
            return view('feed', array('usuario' => $usuario));
        }


    }

    public function postar( $id, Request $request)
    {  
        $post = new Post;

        $post->usuario_id = $id;
        $post->post = $request->post;        

        if (isset($request->post) && isset($post->usuario_id)) 
        {   
            $post->save();

            return redirect('/feed/' . $id)->with('postado', 'Seu post foi registrado com sucesso!');
        }


    }

    public function deletar($id)
    {
        //Buscando o post para deletar
        $post = Post::where('id', $id); 


        $post->delete();

        return redirect()->back()->with('deletado', 'Post apagado com sucesso!');   

    }
}

