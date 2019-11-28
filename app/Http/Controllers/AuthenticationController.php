<?php

namespace App\Http\Controllers;

use App\BusinessObject\AuthBusinessObject;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
  /**
   * @param Request $request
   * @return Response
   */
  public function login(Request $request)
  {
    // dd($request->all());
    try {
      $email = $request->input('email');
      $senha = $request->input('senha');
      $expiredTimeSeconds = $request->input('expired_time') ?? 86400;
      $response = (new AuthBusinessObject())->login($email, $senha, $expiredTimeSeconds);
      if (is_null($response)) return response()->json(['error' => "Usuário e/ou senha incorretos.", "status" => 401]);
      return response()->json($response);
    } catch (Exception $ex) {
      return response()->json(["error" => $ex->getMessage(), "status" => 401]);
    }
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function refreshToken(Request $request)
  {
    try {
      $expiredTimeSeconds = $request->input('expire_time_seconds') ?? 86400;
      // $response = (new AuthBusinessObject())->refreshToken($expiredTimeSeconds);
      // if (is_null($response)) throw new InvalidAuthenticationCredentials("Wrong data for authentication.", 0);
      // return response()->json($response);
    } catch (InvalidAuthenticationCredentials $ex) {
      // return ExceptionBuilder::build(
      // InvalidAuthenticationCredentials::class,
      // 401,
      // $ex->getMessage(),
      // $ex
      // );
    }
  }


  /**
   * @param Request $request
   * @return Response
   */
  public function verifyToken(Request $request)
  {
    try {
      // $token = $request->bearerToken();
      // JWT::decode($token, env('JWT_SECRET_KEY'), ['HS256']);
      // if (TokensModel::where('str_token', $token)->first()) {
      // return response()->json(['find' => true]);
      // } else {
      // return response()->json(['find' => false]);
      // }
    } catch (SignatureInvalidException $exception) {
      // return response()->json(['find' => false]);
    }
  }
}
