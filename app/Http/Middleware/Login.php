<?php

namespace App\Http\Middleware;


use Illuminate\Support\Facades\Hash;
use App\Usuario;
use Closure;
use DateTime;

class Login
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {

    // $regras =
    //   [
    //     'email' => 'required|email',
    //     'senha' => 'required'
    //   ];

    // $mensagens =
    //   [
    //     //mensagens do email e senha
    //     'email.required' => 'É necessário inserir o e-mail!',
    //     'email' => 'É necessário inserir um e-mail válido!',
    //     'senha.required' => 'É necessário inserir a senha!'
    //   ];

    // $request->validate($regras, $mensagens);
    //Setando as variáveis com os dados do formulário de login

    if (is_null($request->email) || is_null($request->senha)) {
      return response()->json(["error" => "Preencha os campos corretamente!", "status" => 400]);
    }

    $email = $request->email;

    $usuario = Usuario::where('email', $email)->first();
    $exp = env('EXPIRED_TIME_SECONDS');

    if (is_null($usuario)) return response()->json(["error" => "Usuário não encontrado!", "status" => 401]);

    // $expireTimeSeconds = $usuario->


    // (new DateTime())->modify("+{$exp} seconds")->getTimestamp();

    // dd($teste);

    if ($request->senha) {

      $checkHash = Hash::check(
        $request->senha,
        $usuario->getAttributes()['senha']
      );

      if (!$checkHash) return response()->json(["error" => "Login ou senha incorretos!", "status" => 401]);

      $tokenPayload = [
        'nome' => $usuario->nome,
        'expires' => (new DateTime())->modify("+{$exp} seconds")->getTimestamp(),
        'senha' => $usuario->senha,
        'email' => $usuario->email,
        'celular' => $usuario->celular,
        'tipo_usuario' => $usuario->tipo_usuario
      ];

      $jwt = JWT::encode($tokenPayload, env('KEY_FOR_TOKEN'));



      return response()->json(["success" => $usuario->getAttributes()['token'], "status" => 200]);
    }
  }
}
