<?php

use Illuminate\Http\Request;


//Rotas para cadastro
// Route::get('cadastrese', function () {
// 	return view('cadastrese');
// });



Route::prefix('usuarios')->group(function () {

  //Rota usuários
  Route::get('/', 'UsuarioController@index');

  Route::post('create', 'UsuarioController@salvar');

  Route::delete('delete', 'UsuarioController@deletar');

  Route::put('validarusuario')->middleware('login');


  Route::get('logout')->middleware('logout');

});



//Rotas do Feed
Route::get('feed/{id}','FeedController@Index')->middleware('sessao');
Route::post('feed/postar/{id}','FeedController@postar')->middleware('sessao');
Route::get('feed/deletar/{id_post}','FeedController@deletar')->middleware('sessao');



