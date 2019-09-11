<?php

namespace App\Http\Middleware;

use Closure;

class Logout
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
      session_start();
      session_destroy();
      return redirect('/');
        // return $next($request);
    }
}
