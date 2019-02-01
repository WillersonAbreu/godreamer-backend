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

Route::get('feed/{id}', function ($id){

    //Buscando dados do usuário pelo ID
	$usuario = Usuario::find($id);
	if (isset($id)) 
    {
    //Setando as variáveis com os dados do usuário
	$id = $usuario->id;
	$nome = $usuario->nome;
	$email = $usuario->email;    
	$senha = $usuario->senha;
	$endereco = $usuario->endereco;
	$celular = $usuario->celular;    
    $nascimento = date('d-m-Y', strtotime($usuario->data_nasc));//<----Convertendo a data
    $rg = $usuario->rg;
    $cpf = $usuario->cpf;
    $tipo_usuario = $usuario->tipo_usuario;
    
    
    	 //Retornando a view com todos os dados como parâmetro
    	return view('feed', array(
    		'id' => $id,
    		'nome' => $nome,
    		'email' => $email,
    		'senha' => $senha,
    		'endereco' => $endereco,
    		'celular' => $celular,
    		'data_nasc' => $nascimento,
    		'rg' => $rg,
    		'cpf' => $cpf,
    		'tipo_usu' => $tipo_usuario));
    }
    else
    {
    	return redirect()->back()->with('errologin', 'É necessário estar logado para acessar a página!');

    }

    
});



