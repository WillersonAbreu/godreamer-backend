<?php

use App\Usuario;

//Rota index
Route::any('/', function () {
	return view('index');
});

//Rotas para cadastro
Route::get('cadastrese', function () {
	return view('cadastrese');
});
Route::put('cadastrese/salvar', 'UsuarioController@salvar');

//Rota usuários
Route::put('validarusuario')->middleware('login');
Route::put('logout')->middleware('logout');


//Rotas do Feed
Route::get('feed/{id}','FeedController@Index')->middleware('sessao');
Route::post('feed/postar/{id}','FeedController@postar')->middleware('sessao');
Route::get('feed/deletar/{id_post}','FeedController@deletar')->middleware('sessao');

