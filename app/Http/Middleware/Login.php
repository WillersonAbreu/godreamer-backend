<?php

namespace App\Http\Middleware;

// use App\Data\Token;
use App\Data\Tokens;
use App\Token as TokensModel;
use Closure;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Http\Request;
use UnexpectedValueException;

class Login
{
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    // dd(Tokens::$tokenDecoded);

    // Tokens::$tokenEncoded =
    $jwt = $request->bearerToken();
    // Tokens::$refreshToken =
    $request->header('refreshToken');

    try {
      // Verify if it's a valid JWT
      // Tokens::
      $tokenDecoded = JWT::decode($jwt, env('JWT_SECRET_KEY'), ['HS256']);
      // Verify if it's exists in database
      if (!TokensModel::where('token', $jwt)->where('is_active', 1)->first()) {
        return response()->json(['success' => false, 'message' => 'Invalid token']);
      }
    } catch (SignatureInvalidException $exception) {
      return response()->json(['error' => 'Incorrect signature key', 'code' => 1], 401);
    } catch (ExpiredException $exception) {
      return response()->json(['error' => 'Expired token', 'code' => 2], 401);
    } catch (UnexpectedValueException $exception) {
      return response()->json(['error' => 'Unexpected token value', 'code' => 0], 401);
    }
    return $next($request);
  }
}
