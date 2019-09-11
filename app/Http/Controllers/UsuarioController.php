<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{

    public function index(){
      $usuarios = Usuario::all();

      if(!empty($usuarios)){
        return response()->json($usuarios, 200);
      }else{
        return response()->json(['message' => 'Não existem usuarios', 400]);
      }
    }


    public function salvar(Request $request){
        //Criando um novo objeto da classe usuário
        $usuarios = new Usuario;

        //testando senhas iguais
        $senha = $request->senha;
        $senha1 = $request->senha1;

        //conversão de data
        $data = $request->data_nasc;
        $data = implode('-', array_reverse(explode('/', "$data")));

        if ($senha === $senha1){
            //Passando os dados da request do form para as variáveis
            $usuarios->nome = $request->nome;
            $usuarios->email = $request->email;
            $usuarios->senha = $request->senha;
            $usuarios->endereco = $request->endereco;
            $usuarios->celular = $request->celular;
            $usuarios->data_nasc = $data;
            $usuarios->tipo_usuario = $request->tipo_usuario;

            try{
              //Gravando no Banco os dados recebidos
              if($usuarios->save()){
                return response()->json(["message" => "User registered successfully" , "status" => 200]);
              }
            }catch(Exception $ex){
              return response()->json(["error" => $ex->getMessage(),"status" => 400]);
            }
        }
        else{
            return response()->json(["error" => "The password confirmation does not match", "status" => 401]);
        }
    }

    public function deletar(Request $request){
      $id = $request->id;
      if(!empty($id) || !$id === 0){
        try{
          $usuario = Usuario::find($id);
          if($usuario->delete()){
            return response()->json(["message" => "User deleted successfully", "status" => 200]);
          }
        }catch(Exception $ex){
          return response()->json(["error" => $ex->getMessage(), "status" => 401]);
        }
      }else {
        return response()->json(["error" => "The User id is missing", "status" => 401]);
      }
    }
}
