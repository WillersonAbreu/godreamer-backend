<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use Validator;
use App\Helpers\GenerateToken;

class UsuarioController extends Controller
{
  /**
   * @return json users
   */
  public function index()
  {
    $usuarios = Usuario::all();

    if (!empty($usuarios)) {
      return response()->json($usuarios, 200);
    } else {
      return response()->json(['message' => 'Não existem usuarios', 400]);
    }
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function create(Request $request)
  {
    //Criando um novo objeto da classe usuário
    $usuarios = new Usuario;
    //conversão de data
    $data = $request->data_nasc;
    $data = implode('-', array_reverse(explode('/', "$data")));

    $validator = Validator::make(
      $request->all(),
      [
        'nome' => 'required|min:3|max:80',
        'email' => 'required|email|unique:usuarios|min:7|max:80',
        'senha' => 'required|min:4|confirmed|max:20',
        'celular' => 'required|unique:usuarios|min:14|max:14',
        'data_nasc' => 'required|min:10|max:10',
        'tipo_usuario' => 'required',
      ],
      [
        //mensagens do nome
        'nome.required' => 'The user name is necessary!',
        'nome.min' => 'Name must contain at least 3 characters!',
        'nome.max' => 'Name must contain a maximum of 80 characters!',

        //mensagens do email
        'email.required' => 'You must enter the email!',
        'email.email' => 'You must enter a valid email address!',
        'email.unique' => 'This Email is already in use!',
        'email.min' => 'Email must contain at least 7 characters!',
        'email.max' => 'Email must contain a maximum of 80 characters!',
        //mensagens da senha
        'senha.required' => 'Password must be entered!',
        'senha.min' => 'Email must contain at least 4 characters!',
        'senha.max' => 'Email must contain at least 20 characters!',
        'senha.confirmed' => 'Password and confirmation are different',
        //mensagens do celular
        'celular.required' => 'You need to insert the mobile number!',
        'celular.min' => 'Mobile Number must contain exactly 11 numbers',
        'celular.max' => 'Mobile Number must contain exactly 11 numbers',
        'celular.unique' => 'This mobile number is already in use!',
        //mensagens da data de nascimento
        'data_nasc.required' => 'You must enter date of birth!',
        'data_nasc.min' => 'Date of birth must contain exactly 8 numbers!',
        'data_nasc.max' => 'Date of birth must contain exactly 8 numbers!',
        //mensagens do tipo de usuário
        'tipo_usuario.required' => 'You must enter the user type!'
      ]
    );

    if ($validator->fails()) {
      return response()->json(["error" => $validator->errors(), "status" => 401]);
    }

    $user = [
      'nome' => $request->nome,
      'email' => $request->email,
      'senha' => $request->senha,
      'celular' => $request->celular,
      'tipo_usuario' => $request->tipo_usuario
    ];

    $jwtENovaSenha = GenerateToken::createToken($user);

    //Passando os dados da request do form para as variáveis
    $usuarios->nome = $request->nome;
    $usuarios->email = $request->email;
    $usuarios->senha = $jwtENovaSenha['novaSenha'];
    $usuarios->token = $jwtENovaSenha['jwt'];
    $usuarios->celular = $request->celular;
    $usuarios->data_nasc = $data;
    $usuarios->tipo_usuario = $request->tipo_usuario;

    try {
      //Gravando no Banco os dados recebidos
      if ($usuarios->save()) {
        return response()->json(["message" => "User registered successfully", "status" => 200]);
      }
    } catch (Exception $ex) {
      return response()->json(["error" => $ex->getMessage(), "status" => 400]);
    }
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function delete(Request $request)
  {
    $id = $request->id;
    if (!empty($id) || !$id === 0) {
      $usuario = Usuario::find($id);
      if ($usuario === NULL) {
        return response()->json(["error" => 'The user with this id does not exists!', "status" => 401]);
      } else {
        try {

          $usuario->delete();
          return response()->json(["message" => "User deleted successfully", "status" => 200]);
        } catch (Exception $ex) {
          return response()->json(["error" => $ex->getMessage(), "status" => 401]);
        }
      }
    } else {
      return response()->json(["error" => "The User id is missing", "status" => 401]);
    }
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function update(Request $request)
  {
    $id = $request->id;

    $data = $request->data_nasc;
    $data = implode('-', array_reverse(explode('/', "$data")));

    $nome = $request->nome;
    $email = $request->email;
    $senha = $request->senha;
    $celular = $request->celular;
    $data_nasc = $data;
    $tipo_usuario = $request->tipo_usuario;

    $validator = Validator::make(
      $request->all(),
      [
        'nome' => 'required|min:3|max:80',
        'email' => 'required|email|min:7|max:80',
        'senha' => 'required|min:4|confirmed|max:20',
        'celular' => 'required|min:14|max:14',
        'data_nasc' => 'required|min:10|max:10',
        'tipo_usuario' => 'required',
      ],
      [
        //mensagens do nome
        'nome.required' => 'The user name is necessary!',
        'nome.min' => 'Name must contain at least 3 characters!',
        'nome.max' => 'Name must contain a maximum of 80 characters!',

        //mensagens do email
        'email.required' => 'You must enter the email!',
        'email.email' => 'You must enter a valid email address!',
        'email.min' => 'Email must contain at least 7 characters!',
        'email.max' => 'Email must contain a maximum of 80 characters!',
        //mensagens da senha
        'senha.required' => 'Password must be entered!',
        'senha.min' => 'Email must contain at least 4 characters!',
        'senha.max' => 'Email must contain at least 20 characters!',
        'senha.confirmed' => 'Password and confirmation are different',
        //mensagens do celular
        'celular.required' => 'You need to insert the mobile number!',
        'celular.min' => 'Mobile Number must contain exactly 11 numbers',
        'celular.max' => 'Mobile Number must contain exactly 11 numbers',
        //mensagens da data de nascimento
        'data_nasc.required' => 'You must enter date of birth!',
        'data_nasc.min' => 'Date of birth must contain exactly 8 numbers!',
        'data_nasc.max' => 'Date of birth must contain exactly 8 numbers!',
        //mensagens do tipo de usuário
        'tipo_usuario.required' => 'You must enter the user type!'
      ]
    );

    if ($validator->fails()) {
      return response()->json(["error" => $validator->errors(), "status" => 401]);
    }

    if (!empty($id) || !$id === 0) {
      $usuario = Usuario::find($id);

      if ($usuario === null) {
        return response()->json(["error" => 'The user with this id does not exists!', "status" => 401]);
      } else {
        try {

          $usuario->nome = $nome;
          $usuario->email = $email;
          $usuario->senha = $senha;
          $usuario->celular = $celular;
          $usuario->data_nasc = $data_nasc;
          $usuario->tipo_usuario = $tipo_usuario;

          $usuario->save();

          return response()->json(["message" => "User updated successfully", "status" => 200]);
        } catch (Exception $ex) {
          return response()->json(["error" => $ex->getMessage(), "status" => 401]);
        }
      }
    } else {
      return response()->json(["error" => "The User id is missing", "status" => 401]);
    }
  }
}
