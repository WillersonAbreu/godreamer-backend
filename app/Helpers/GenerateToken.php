<?php

namespace App\Helpers;

use \Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;

final class GenerateToken
{


  public static function createToken(array $token)
  {
    $key = '5dd9c6ea63f110bc0f3046e3c1356117';

    if (is_null($token)) return response()
      ->json(["error" => "The token is null", "status" => 400]);

    $novaSenha = Hash::make($token['senha']);
    unset($token['senha']);
    $jwt = JWT::encode($token, $key);

    return compact('jwt', 'novaSenha');
  }

  public function decodeToken()
  { }
}
