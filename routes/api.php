<?php

use Illuminate\Http\Request;


//Rotas para cadastro
// Route::get('cadastrese', function () {
// 	return view('cadastrese');
// });


Route::put('validarusuario')->middleware('login');
Route::get('logout')->middleware('logout');

Route::prefix('usuarios')->group(function () {
  //Rota usuários
  Route::get('/', 'UsuarioController@index');
  Route::post('create', 'UsuarioController@create');
  Route::put('update', 'UsuarioController@update');
  Route::delete('delete', 'UsuarioController@delete');
});


Route::prefix('post')->group(function(){
  Route::post('/','PostController@create')->middleware('sessao');
  Route::delete('/delete','PostController@delete')->middleware('sessao');
});

//Rotas do Feed
Route::get('feed/{id}','FeedController@Index')->middleware('sessao');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

