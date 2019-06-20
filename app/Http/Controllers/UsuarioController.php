<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /*function __construct()
    {
        $this->middleware(\App\Http\Middleware\Login::class);
    }*/

    public function index()
    {
        $usuarios = Usuario::all();

        foreach ($usuarios as $u) {
            $u->id;
            $u->nome;
            $u->email;
            $u->senha;
            $u->endereco;
            $u->celular;
            $u->data_nasc;
            $u->tipo_usuario;
        }
    }


    public function salvar(Request $request)
    {   //Criando um novo objeto da classe usuário
        $usuarios = new Usuario;

        //testando senhas iguais
        $senha = $request->senha;
        $senha1 = $request->senha1;

        //conversão de data
        $data = $request->data_nasc;
        $data = implode('-', array_reverse(explode('/', "$data")));

        if ($senha == $senha1)
        {
            $regras =
            [
                'nome' => 'required|min:3|max:80',
                'email' => 'required|email|unique:usuarios|min:7|max:80',
                'senha' => 'required|min:4|max:20',
                'endereco' => 'required|min:10|max:200',
                'celular' => 'required|unique:usuarios|min:14|max:14',
                'data_nasc' => 'required|min:10|max:10',
                'optradio' => 'required',
            ];

            $mensagens =
            [   //mensagens do nome
                'nome.required' => 'É necessário inserir o nome!',
                'nome.min' => 'O Nome deve conter no mínimo 3 caracteres!',
                'nome.max' => 'O Nome deve conter no máximo 80 caracteres!',
                //mensagens do email
                'email.required' => 'É necessário inserir o email!',
                'email.email' => 'É necessário inserir um email válido!',
                'email.unique' => 'Este E-mail já está em uso!',
                'email.min' => 'O E-mail deve conter no mínimo 7 caracteres!',
                'email.max' => 'O E-mail deve conter no máximo 80 caracteres!',

                //mensagens da senha
                'senha.required' => 'É necessário inserir senha!',
                'senha.min' => 'O E-mail deve conter no mínimo 4 caracteres!',
                'senha.max' => 'O E-mail deve conter no mínimo 20 caracteres!',

                //mensagens do endereco
                'endereco.required' => 'É necessário inserir o endereço!',
                'endereco.min' => 'O Endereço deve conter no mínimo 10 caracteres!',
                'endereco.max' => 'O Endereço deve conter no máximo 200 caracteres!',

                //mensagens do celular
                'celular.required' => 'É necessário inserir o celular!',
                'celular.min' => 'O Número do celular deve conter exatamente 11 números',
                'celular.max' => 'O Número do celular deve conter exatamente 11 números',
                //mensagens da data de nascimento
                'data_nasc.required' => 'É necessário inserir data de nascimento!',
                'data_nasc.min' => 'A Data de nascimento deve conter exatamente 8 números!',
                'data_nasc.max' => 'A Data de nascimento deve conter exatamente 8 números!',

                //mensagens do tipo de usuário
                'optradio.required' => 'É necessário inserir o tipo de usuário!'
            ];

            $request->validate($regras, $mensagens);

            //Passando os dados da request do form para as variáveis
            $usuarios->nome = $request->nome;
            $usuarios->email = $request->email;
            $usuarios->senha = $request->senha;
            $usuarios->endereco = $request->endereco;
            $usuarios->celular = $request->celular;
            $usuarios->data_nasc = $data;
            $usuarios->tipo_usuario = $request->optradio;

            //Gravando no Banco os dados recebidos
            $usuarios->save();

            if ($usuarios->save() == true)
            {

                return redirect()->back()->with('successo', 'Usuário Cadastrado com sucesso! Faça já o seu Login.');
            }

            else
            {
                return redirect()->back()->with('falha', 'Falha em acessar o banco de dados');

            }

        }
        else
        {
            return redirect()->back()->with('senhaerrada', 'As senhas devem ser iguais!');
        }
    }
}
