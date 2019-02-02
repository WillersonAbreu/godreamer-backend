<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>ChangeYou</title>
  <link rel="shortcut icon" href="{{asset('img/logo.png')}}" >
  <!-- Bootstrap -->
  <link rel="stylesheet" href="{{asset('css/app.css')}}" crossorigin="anonymous">  
  <script src="{{asset('js/app.js')}}" type="text/javascript" crossorigin="anonymous"></script>
  <script src="{{asset('js/jquery.mask.min.js')}}" type="text/javascript" crossorigin="anonymous"></script>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">



  <!-- Styles -->
  <style>
  html, body {
    background-color: #fff;
    color: #636b6f;
    font-family: 'Nunito', sans-serif;
    font-weight: 200;
    height: 100vh;
    margin: 0;
  }

  .rodape{
    bottom:0;
    position: fixed;
    width: 100%;
  }

  .content {
    text-align: center;
  }

  .title {
    font-size: 42px;
  }


  .m-b-md {
    margin-bottom: 30px;
  }

  #bg-inputs
  {
    background-color: white;
    border: 1px solid lightgrey;
  }
  .btn-cadastre-se {

    margin-top: 20px;
    margin-bottom: 20px;

  }

  .btn-login:hover {
    background-color: blue;
  }

  .btn-login {
    border-color: black;
    color: black;
  }

  .inputs {    
    border-color: black;
  }

  .nav-shadow {
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  .nav-footer-shadow {
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.5);
  }
  .box-img {
    width: 50%; 
    height: 370px;    
  }

  .titulo-pt1 {
    color: #30d9aa ;

  }

  .titulo-pt2 {

    color: #ffe55c ;
  }

  .titulo-carrossel {
    color: black;
    text-shadow: 2px 2px 2px white;    
  }

</style>


</head>
<body>      
  @section('navbar')
  <nav style="position:fixed; z-index:999; left:0%; right: 0%; top:0; " class="container-fixed navbar navbar-expand-lg  navbar-light bg-light nav-shadow">
    <h1 class="titulo-pt1">Change<strong class="titulo-pt2">You</strong></h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
      <ul class="navbar-nav mr-auto">

      </ul>
      @section('formlogin')      
      <form class="form-inline my-2 my-lg-0" method="POST" action="/validarusuario">  
        @method('PUT')
        @csrf
        <div class="row">
          <div class="col">
            <input  class="form-control mr-sm-2 inputs {{ $errors->has('email') ? 'is-invalid' : '' }}" name="email" type="email" placeholder="E-mail" aria-label="E-mail">
            @if($errors->has('email'))
            <div id="bg-inputs" style="position:fixed; z-index:999;" class="invalid-feedback ">
              {{ $errors->first('email') }}
            </div>
            @endif
          </div>
          <div class="col">
            <input  class="form-control mr-sm-2 inputs {{ $errors->has('email') ? 'is-invalid' : '' }}" name="senha" type="password" placeholder="Senha" aria-label="Senha">
            @if($errors->has('senha'))
            <div id="bg-inputs" style="position:fixed; z-index:999;" class="invalid-feedback ">
              {{ $errors->first('senha') }}
            </div>
            @endif
          </div>
        </div>
        <button  class="btn btn-outline-info btn-login my-2 my-sm-0" type="submit">Login</button>
      </form>      
      @show
    </div>
  </nav>
  @show
  
  @section('body')  
  <div class="container box-img"  style="margin-top: 100px;">
    @if(session()->has('erroemail'))
    <div class="alert alert-danger">
      {{ session()->get('erroemail') }}
    </div>
    @endif
    <div id="carouselExampleSlidesOnly " class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100 " src="{{asset('img/cuidar-de-si-mesmo.jpg')}}" alt="Primeiro Slide">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="titulo-carrossel"><strong>Cuide de sua mente</strong> </h2>
            <p>Busque autoconhecimento e cuide de si mesmo</p>
          </div>
        </div>
        <div class="carousel-item">
          <img  class="d-block w-100" src="{{asset('img/exercicios-fisicos.jpg')}}" alt="Segundo Slide">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="titulo-carrossel"><strong>Cuide do seu corpo</strong></h2>
            <p>Diminua o estresse e sedentarismo praticando atividades físicas</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100"  src="{{asset('img/ler-livro.jpg')}}" alt="Terceiro Slide">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="titulo-carrossel"><strong>Cuide da sua mente</strong></h2>
            <p>Busque conhecimento através da leitura</p>
          </div>          
        </div>
        <div class="carousel-item">
          <img  class="d-block w-100" src="{{asset('img/pessoas-felizes.jpg')}}" alt="Quarto Slide">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="titulo-carrossel"><strong>Seja Feliz</strong></h2>
            <p>Busque a felicidade todos os dias da sua vida</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content" style="margin-bottom 10px;">
      <form name="button-cadastro" method="GET" action="http://127.0.0.1:8000/cadastrese">    
        <div>
          <button type="submit" class="btn btn-success btn-cadastre-se">Cadastre-se</button>
        </div>
      </form>
    </div>   
  </div>

  @show  

  @section('footer')  
  <footer class="rodape nav-footer-shadow align-items-end">
    <nav class="navbar navbar-light bg-light">
      <div>      
        <span class="titulo-pt1">Change<strong class="titulo-pt2">You</strong></span> todos os direitos reservados 2019 
      </div>     
    </nav>
  </footer>

  @show
  <script type="text/javascript">
    $(document).ready(function(){
      $('#data').mask('00/00/0000');
      $('#cpf').mask('000000000-00'); 
      $('#rg').mask('00000000-00'); 
      $('#celular').mask('(00)00000-0000');
    });
  </script>
</body>
</html>
