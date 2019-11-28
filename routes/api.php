<?php


Route::post('/login', 'AuthenticationController@login');
Route::get('/verify-token', 'AuthenticationController@verifyToken');

Route::post('usuarios/create', 'UsuarioController@create');

Route::middleware('login')->group(function () {
  //Renova o token do usuário
  Route::post('/refresh-token', 'AuthenticationController@refreshToken');

  //Rota de Usuários
  Route::prefix('usuarios')->group(function () {
    Route::get('/', 'UsuarioController@index');
    Route::get('/{id}', 'UsuarioController@getUserById');
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
});
