<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Validator;

class PostController extends Controller
{

    /**
     * Fetches all posts from database
     * @return array $Posts
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    /**
     * Create a new post on database;
     * @param Request $request
     * @return array $message
     */
    public function create(Request $request)
    {
        $imagem = $request->imagem;
        $id = $request->id;
        $post = $request->post;

        if (isset($imagem)) {
            $regras =
                [
                'imagem' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
            $mensagens =
                [
                //mensagens do post e img
                'post.required' => 'É necessário inserir um texto ou uma imagem para postar!',
                'imagem.max' => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image' => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails()) {
                return response()->json(["error" => $validator->errors(), "status" => 401]);
            }

            if (isset($request->post) && isset($request->imagem)) {
                $nomeImagem = time() . '.' . request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
                $url_img = $nomeImagem;
                $post = new Post;
                $post->usuario_id = $id;
                $post->post = $request->post;
                $post->url_img = $url_img;
                try {
                    if ($post->save()) {
                        return response()->json(["message" => "Post registered successfully", "status" => 200]);
                    }
                } catch (Exception $ex) {
                    return response()->json(["error" => $ex->getMessage(), "status" => 400]);
                }
            } elseif (isset($request->imagem)) {
                $nomeImagem = time() . '.' . request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
                $url_img = $nomeImagem;
                $post = new Post;
                $post->usuario_id = $id;
                $post->url_img = $url_img;
                try {
                    if ($post->save()) {
                        return response()->json(["message" => "Post registered successfully", "status" => 200]);
                    }
                } catch (Exception $ex) {
                    return response()->json(["error" => $ex->getMessage(), "status" => 400]);
                }
            }
        } else {
            $regras =
                [
                'post' => 'min:3',
            ];
            $mensagens =
                [
                //mensagens do post e img
                'post.min' => 'É necessário inserir no mínimo 3 caracteres para postar!',
                'imagem.max' => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image' => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);
            // $request->validate($regras, $mensagens);

            if ($validator->fails()) {
                return response()->json(["error" => $validator->errors(), "status" => 401]);
            }

            $post = new Post;
            $post->usuario_id = $id;
            $post->post = $request->post;
            try {
                if ($post->save()) {
                    return response()->json(["message" => "Post registered successfully", "status" => 200]);
                }
            } catch (Exception $ex) {
                return response()->json(["error" => $ex->getMessage(), "status" => 401]);
            }
        }
    }

    /**
     * Update one post.
     * @param Request $request;
     * @return array $message;
     */
    public function update(Request $request)
    {
        // dd($request->all());
        $imagem = $request->imagem;
        $post_id = $request->post_id;
        $user_id = $request->user_id;
        $post = $request->post;

        if (isset($imagem)) {
            $regras =
                [
                'imagem' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
            $mensagens =
                [
                //mensagens do post e img
                'post.required' => 'É necessário inserir um texto ou uma imagem para postar!',
                'imagem.max' => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image' => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails()) {
                return response()->json(["error" => $validator->errors(), "status" => 401]);
            }

            if (isset($request->post) && isset($request->imagem)) {
                $nomeImagem = time() . '.' . request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
                $url_img = $nomeImagem;
                $post = Post::find($post_id);
                $post->usuario_id = $post->usuario_id;
                $post->post = $request->post;
                $post->url_img = $url_img;
                try {
                    if ($post->save()) {
                        return response()->json(["message" => "Post updated successfully", "status" => 200]);
                    }
                } catch (Exception $ex) {
                    return response()->json(["error" => $ex->getMessage(), "status" => 400]);
                }
            } elseif (isset($request->imagem)) {
                $nomeImagem = time() . '.' . request()->imagem->getClientOriginalExtension();
                request()->imagem->move(public_path('ImgPosts'), $nomeImagem);
                $url_img = $nomeImagem;
                $post = Post::find($post_id);
                $post->usuario_id = $user_id;
                $post->url_img = $url_img;
                try {
                    if ($post->save()) {
                        return response()->json(["message" => "Post updated successfully", "status" => 200]);
                    }
                } catch (Exception $ex) {
                    return response()->json(["error" => $ex->getMessage(), "status" => 400]);
                }
            }
        } else {

            $regras =
                [
                'post' => 'min:3',
            ];
            $mensagens =
                [
                //mensagens do post e img
                'post.min' => 'É necessário inserir no mínimo 3 caracteres para postar!',
                'imagem.max' => 'É necessário inserir uma imagem menor que 2MB!',
                'imagem.image' => 'O arquivo deve ser uma imagem Ex: jpeg, png, jpg, gif ou svg',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails()) {
                return response()->json(["error" => $validator->errors(), "status" => 401]);
            }

            $post = Post::find($post_id);
            $post->usuario_id = $user_id;
            $post->post = $request->post;
            try {
                if ($post->save()) {
                    return response()->json(["message" => "Post updated successfully", "status" => 200]);
                }
            } catch (Exception $ex) {
                return response()->json(["error" => $ex->getMessage(), "status" => 401]);
            }
        }
    }

    /**
     * Delete on post from database;
     * @param int $id;
     * @return array $message
     */
    public function delete(Request $request)
    {

        $validator = Validator::make($request->all(),
            ['id' => 'required|integer'],
            ['id.required' => 'The post id is necessary!',
                'id.integer' => 'The id needs to be a number!s',
            ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors(), "status" => 401]);
        }

        //Buscando o post para deletar
        $id = $request->id;
        $post = Post::find($id);

        if ($post === null) {
            return response()->json(['error' => "Haven't post with this id on database!", "status" => 401]);
        }

        $img = $post->url_img;

        if (isset($img)) {
            if (unlink(public_path('ImgPosts/' . $img))) {
                if ($post->delete()) {
                    return response()->json(["message" => "Post deleted successfully", "status" => 200]);
                }
            }
        } else {
            if ($post->delete()) {
                return response()->json(["message" => "Post deleted successfully", "status" => 200]);
            }
        }
    }
}
