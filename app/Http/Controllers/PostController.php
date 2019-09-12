<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller{
  public function create( Request $request){

      dd($request);
      if ( isset($request->imagem)){
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
        }elseif (isset($request->imagem)){
          $nomeImagem = time().'.'.request()->imagem->getClientOriginalExtension();
          request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
          $url_img = $nomeImagem;
          $post = new Post;
          $post->usuario_id = $id;
          $post->url_img = $url_img;
          $post->save();
          return redirect('/feed/' . $id)->with('postado', 'Seu post foi registrado com sucesso!');
        }
      }else{
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


  public function delete($id)
  {
    //Buscando o post para deletar
    $i = DB::select('select * from posts where id_post = ?', [$id]);

    foreach ($i as $i){
      $img = $i->url_img;
    }
    if (isset($img)){
      if (unlink(public_path('ImgPosts/'.$img))){
        $del = Post::where('id_post', $id);
        if($del){
          if ($del->delete()){
            return redirect()->back()->with('deletado', 'Post apagado com sucesso!');
          }
        }else{
          return redirect()->back()->with('naodeletado', 'Post não pôde ser deletado!');
        }
      }
    }else{
      $del = Post::where('id_post', $id);
      if($del){
        if ($del->delete()){
          return redirect()->back()->with('deletado', 'Post apagado com sucesso!');
        }else{
          return redirect()->back()->with('naodeletado', 'Post não pôde ser deletado!');
        }
      }
    }
  }
}
