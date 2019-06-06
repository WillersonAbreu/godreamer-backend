<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Post;
use Illuminate\Http\Request;

class FeedController extends Controller
{   
    function __construct(Request $request)
    {
       /* if (!$request->session()->exists('id'))
        {
            return redirect('/')->with('naologado', 'Você precisa fazer login!');
        }
       */
    }
    
    public function Index($id)
    {
        //Buscando dados do usuário pelo ID
        $usuario = DB::select('select * from usuarios as U where U.id = ?', [$id]);
        
        //Buscando dados dos amigos
        $amigos = DB::select('select A.*, U.* from amigos as A inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?', [$id]);
        //Buscando dados dos posts e seus respectivos donos
        $post_amigos = DB::select('select A.*, U.*, P.* from amigos as A inner join posts as P on P.usuario_id = A.id_usuario inner join usuarios as U on U.id = A.id_usuario where A.usuario_id = ?', [$id]);    
        //Buscando Post do usuario logado e seus dados
        $post = DB::select('select U.*, P.* from usuarios as U inner join posts as P on P.usuario_id = U.id where U.id = ?', [$id]);
        
        if (isset($post_amigos) && isset($post) && isset($usuario) && isset($amigos)) 
        {            
            return view('feed', compact('post_amigos', 'post', 'usuario', 'amigos'));
        }
        elseif (isset($usuario)) 
        {   
            return redirect('/feed/' . $id)->with('semamigos','Você não tem amigos, busque um amigo!');      
            
        }
    }
    
    public function postar( $id, Request $request)
    {  
        if ( isset($request->imagem)) 
        {   
            $regras = 
            [   
                'imagem' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ];            
            $mensagens = 
            [   
                //mensagens do post e img
                'post.required' => 'É necessário inserir um texto ou uma imagem para postar!',
                'imagem.max'    => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image'  => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg'
            ];            
            $request->validate($regras, $mensagens);        
            
            if (isset($request->post) && isset($request->imagem)) 
            {
                $nomeImagem = time().'.'.request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);                
                $url_img = $nomeImagem;                
                $post = new Post;                        
                $post->usuario_id = $id;
                $post->post = $request->post; 
                $post->url_img = $url_img;
                $post->save();                            
                return redirect('/feed/' . $id)->with('postado', 'Seu post foi registrado com sucesso!');
            }
            elseif (isset($request->imagem)) 
            {
                $nomeImagem = time().'.'.request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
                $url_img = $nomeImagem;
                $post = new Post;                        
                $post->usuario_id = $id;
                $post->url_img = $url_img;
                $post->save();                            
                return redirect('/feed/' . $id)->with('postado', 'Seu post foi registrado com sucesso!');
            }            
        }
        else
        {   
            $regras = 
            [   
                'post' => 'min:3'
            ];            
            $mensagens = 
            [   
                //mensagens do post e img
                'post.min' => 'É necessário inserir no mínimo 3 caracteres para postar!',
                'imagem.max'    => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image'  => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg'
            ];            
            $request->validate($regras, $mensagens);
            
            $post = new Post;            
            $post->usuario_id = $id;
            $post->post = $request->post;        
            //$post->url_img = '';            
            $post->save();            
            return redirect('/feed/' . $id)->with('postado', 'Seu post foi registrado com sucesso!');
        }
    }
    
    public function deletar($id)
    {           
        //Buscando o post para deletar
        $i = DB::select('select * from posts where id_post = ?', [$id]);
        
        foreach ($i as $i) 
        {
            $img = $i->url_img;
        }
        if (isset($img)) 
        {
            if (unlink(public_path('ImgPosts\\'.$img))) 
            {   
                $del = Post::where('id_post', $id);
                if($del)
                {   
                    if ($del->delete()) 
                    {
                        return redirect()->back()->with('deletado', 'Post apagado com sucesso!');
                    }                    
                } 
                else
                {
                    return redirect()->back()->with('naodeletado', 'Post não pôde ser deletado!');
                }           
            }         
        }
        else
        {
            $del = Post::where('id_post', $id);            
            if($del)
            {   
                if ($del->delete()) 
                {
                    return redirect()->back()->with('deletado', 'Post apagado com sucesso!');
                }  
                else
                {
                    return redirect()->back()->with('naodeletado', 'Post não pôde ser deletado!');
                }  
            }
        }
    }
}                



