<?php

namespace App\BusinessObject;

use App\Data\Tokens;
use App\RefreshToken as RefreshTokensModel;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;
use App\Token as TokensModel;
use App\Usuario as UsersModel;
use DateTime;

final class AuthBusinessObject
{
  /**
   * @param string $username
   * @param string $password
   * @param int $expiredTimeSeconds
   * @return array|null
   */
  public function login(string $username, string $password, int $expiredTimeSeconds): ?array
  {
    // dd($username, $password, $expiredTimeSeconds);
    // Get user
    $user = UsersModel::where('email', $username)->first();

    // dd($user);
    if (is_null($user)) return null;

    // Verify password
    // dd(Hash::check($password, $user->senha));
    if (!Hash::check($password, $user->senha)) return null;

    // Mount token payload
    $tokenPayload = [
      'sub' => $user->id,
      'exp' => (new DateTime())->modify("+{$expiredTimeSeconds} seconds")
        ->getTimestamp(),
      'name' => $user->nome,
      'email' => $user->email,
      'celular' => $user->celular,
      'tipo' => $user->tipo_usuario
    ];

    // Generate token
    $jwtToken = JWT::encode($tokenPayload, env('JWT_SECRET_KEY'), 'HS256');

    $refreshTokenPayload = [
      'token' => $jwtToken
    ];

    // Generate refresh token
    $jwtRefreshToken = JWT::encode($refreshTokenPayload, env('JWT_SECRET_KEY'), 'HS256');

    // Store token
    $token = new TokensModel;
    $token->token = $jwtToken;
    $token->expired_at = date('Y-m-d H:i:s', $tokenPayload['exp']);
    $token->usuarios_id = $user->id;
    $token->save();

    // Get inserted id
    $tokenId = $token->id;

    // Store refresh token
    $refreshToken = new RefreshTokensModel;
    $refreshToken->token_id = $tokenId;
    $refreshToken->refresh_token = $jwtRefreshToken;
    $refreshToken->save();

    return [
      "token" => $jwtToken,
      "refresh_token" => $jwtRefreshToken
    ];
  }


  /**
   * @param string $expiredTimeSeconds
   * @return array|null
   */
  public function refreshToken(string $expiredTimeSeconds): ?array
  {
    // Get refresh token data
    // FIXME: I'm not work because refresh token isn't token and here
    // i try found refresh token using this...
    $refreshTokenVerify = RefreshTokensModel::where(
      'refresh_token',
      Token::$refreshToken
    )->where('is_active', 1)->first();
    if (is_null($refreshTokenVerify)) return null;

    // Token renew
    $jwt = Token::$tokenEncoded;
    $jwtBodyb64 = explode('.', $jwt)[1];
    $payload = JWT::jsonDecode(JWT::urlsafeB64Decode($jwtBodyb64));
    $payload->exp = (new DateTime())->modify("+{$expiredTimeSeconds} seconds")
      ->getTimestamp();
    $jwtToken = JWT::encode($payload, env('JWT_SECRET_KEY'), 'HS256');
    $refreshTokenPayload = [
      'token' => $jwtToken
    ];
    $jwtRefreshToken = JWT::encode($refreshTokenPayload, env('JWT_SECRET_KEY'), 'HS256');

    // Disable token
    $token = TokensModel::find($refreshTokenVerify->token_id);
    $token->is_active = 0;
    $token->save();
    unset($token);

    // Disable refresh token
    $refreshToken = RefreshTokensModel::find($refreshTokenVerify->id);
    $refreshToken->is_active = 0;
    $refreshToken->save();
    unset($refreshToken);

    // Store the new token in database
    dd(date('Y-m-d H:i:s', $payload->exp));
    $token = new TokensModel;
    $token->token = $jwtToken;
    $token->expired_at = date('Y-m-d H:i:s', $payload->exp);
    $token->usuarios_id = $payload->sub;
    $token->save();

    // Get inserted id
    $tokenId = $token->id;

    // Store the new refresh token in database
    $refreshToken = new RefreshTokensModel;
    $refreshToken->token_id = $tokenId;
    $refreshToken->refresh_token = $jwtRefreshToken;
    $refreshToken->save();
    return [
      "token" => $jwtToken,
      "refresh_token" => $jwtRefreshToken
    ];
  }
}
