<?php
namespace App\Http\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminare\Http\Request;
use Closure;

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
        $regras =
        [
            'email' => 'required|email',
            'senha' => 'required'
        ];

        $mensagens =
        [
            //mensagens do email e senha
            'email.required' => 'É necessário inserir o e-mail!',
            'email' => 'É necessário inserir um e-mail válido!',
            'senha.required' => 'É necessário inserir a senha!'
        ];

        $request->validate($regras, $mensagens);
        //Setando as variáveis com os dados do formulário de login
        $email = $request->email;
        $senha = $request->senha;


        //Buscando usuário que a senha e email sejam iguais aos da request
        $usuario_email_bd = DB::select('select * from usuarios as U where U.email = ?', [$email]);


        //Setando variáveis com os dados encontrados no banco
        foreach ($usuario_email_bd  as $usu_email)
        {
            $usuario_email = $usu_email->email;
            $usuario_id = $usu_email->id;
            $usuario_senha = $usu_email->senha;
        }
        if(isset($usuario_email))
        {
             //Testando se foi encontrado algo no banco ou não
            if ($usuario_email == $email && $usuario_senha == $senha)
            {
                $sessao = $request->session()->put('email', $request->input('email'));
                $request->session()->put('email', $email);
                $sessao = $request->session()->get('email');

                if (!isset($sessao))
                {
                    return redirect('/')->with('facalogin', 'Por favor faça login');
                }
                else
                {
                    return redirect('/feed/' . $usuario_id)->with('sessao');
                }
            }
            else
            {
                return redirect()->back()->with('erroemail', 'Usuário ou senha não conferem!');
            }
        }
        else
        {
            return redirect()->back()->with('erroemail', 'E-mail não cadastrado na base de dados!');
        }

        //return $next($request);
    }
}
