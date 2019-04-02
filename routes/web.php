<?php

use App\Usuario;

//Rota index
Route::any('/', function () {
	return view('index');
});

//Rota para cadastro
Route::get('cadastrese', function () {
	return view('cadastrese');
});
Route::put('cadastrese/salvar', 'UsuarioController@salvar');

//Rota para realizar login
Route::put('validarusuario', 'UsuarioController@valida');


//Rotas do Feed
Route::get('feed/{id}','FeedController@Index');
Route::post('feed/postar/{id}','FeedController@postar');
Route::get('feed/deletar/{id_post}','FeedController@deletar');

/*/Rotas do chat<-------tentar implementar depois
Route::post('conversacao','ConversacaoController@criar');
Route::get('conversacao/{id_conversa}', function ($id) {
	return view('conversa', ['id'=>$id]);
} );*/