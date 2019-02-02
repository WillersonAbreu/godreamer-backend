<?php

use App\Usuario;


Route::any('/', function () {
	return view('index');
});

Route::get('cadastrese', function () {
	return view('cadastrese');
});

Route::put('cadastrese/salvar', 'UsuarioController@salvar');

Route::put('validarusuario', 'UsuarioController@valida');

Route::get('feed/{id}','FeedController@Index');

Route::get('feed/postar/{id}','FeedController@postar');

Route::get('feed/deletar/{id_post}','FeedController@deletar');