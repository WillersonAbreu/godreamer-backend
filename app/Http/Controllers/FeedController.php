<?php

namespace App\Http\Controllers;

use App\Usuario;
use App\Post;

use Illuminate\Http\Request;

class FeedController extends Controller
{   
    public function Index($id)
    {   
        //Buscando os posts do usuário
        $posts = Post::where('id_usuario', $id)->orderBy('data_post', 'desc')->get();    

        //Buscando dados do usuário pelo ID
        $usuario = Usuario::find($id);
        

        if (isset($usuario) && isset($posts)) 
        {            
            return view('feed', array('posts' => $posts, 'usuario' => $usuario));
        }

        
    }

    public function postar( $id, Request $request)
    {  
        $post = new Post;

        $post->id_usuario = $id;
        $post->post = $request->post;
        
        //Buscando os posts do usuário
        $posts = Post::where('id_usuario', $id)->get();    

        //Buscando dados do usuário pelo ID
        $usuario = Usuario::find($id);

        if (isset($post->id_usuario) && isset($post->post)) 
        {   
            $post->save();

            return redirect()->back()->with('successo_post', 'Recarregue a página e veja o seu novo post');      
        }

        
    }

    public function deletar($id)
    {
        //Buscando o post para deletar
        $post = Post::where('id', $id); 

        if (isset($post)) 
        {
            $post->delete();
    
            return redirect()->back()->with('successo_delete', 'Post apagado com sucesso!');   
        }
    }
}

