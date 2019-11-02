<?php

//Rotas Sessão
Route::put('validarusuario')->middleware('login');
Route::get('logout')->middleware('logout');

//Rota de Usuários
Route::prefix('usuarios')->group(function () {
  Route::get('/', 'UsuarioController@index');
  Route::post('create', 'UsuarioController@create');
  Route::put('update', 'UsuarioController@update');
  Route::delete('delete', 'UsuarioController@delete');
});

//Rotas de Posts
Route::prefix('post')->group(function () {
  Route::get('/', 'PostController@index');
  Route::post('create', 'PostController@create');
  Route::post('update', 'PostController@update');
  Route::delete('delete', 'PostController@delete');
}); //->middleware('sessao');

//Rotas do Feed
Route::prefix('feed')->group(function () {
  Route::get('/{id}', 'FeedController@Index');
  Route::get('/usuario/{id}', 'FeedController@getPostByUserId');
}); //->middleware('sessao');

//Rotas amizade
Route::prefix('amizade')->group(function () {
  Route::get('/{id}', 'AmizadeController@index');
  Route::post('create', 'AmizadeController@create');
  Route::delete('delete', 'AmizadeController@delete');
});
