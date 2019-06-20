<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class Sessao
{
    /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @return mixed
    */
    public function handle($request, Closure $next)
    {   session_start();


        if(isset($_SESSION['email']) && isset($_SESSION['senha'])){
            return $next($request);
        }else{
            return redirect()->back()->with('semsessao', 'faça login!');
        }



    }
}
