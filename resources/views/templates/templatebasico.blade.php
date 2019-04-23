<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>GetYourDream
  </title>
  
  <!-- Bootstrap -->
  <link rel="stylesheet" href="{{asset('css/app.css')}}" crossorigin="anonymous">  
  <script src="{{asset('js/app.js')}}" type="text/javascript" crossorigin="anonymous"></script>
  <script src="{{asset('js/jquery.mask.min.js')}}" type="text/javascript" crossorigin="anonymous"></script>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
  
  
  
  <!-- Styles -->
  <style>
    @font-face{font-family:'Glyphicons Halflings';src:url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot');src:url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff') format('woff'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.ttf') format('truetype'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.svg#glyphicons-halflingsregular') format('svg');}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:normal;line-height:1;-webkit-font-smoothing:antialiased;}
    .glyphicon-picture:before{content:"\e060";}
    
    html, body {
      background-color: #fff;
      color: #636b6f;
      font-family: 'Nunito', sans-serif;
      font-weight: 200;
      height: 100vh;
      margin: 0;
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
      box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
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
    
    @media only screen and (max-width : 540px) 
    {
      .chat-sidebar
      {
        display: none !important;
      }
      
      .chat-popup
      {
        display: none !important;
      }
    }
    
    
    
    .chat-sidebar
    {
      width: 200px;
      position: fixed;
      height: 100%;
      right: 0px;
      top: 0px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid rgba(29, 49, 91, .3);
    }
    
    .sidebar-name 
    {
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 4px;
      font-size: 15px;
    }
    
    .sidebar-name span
    {
      padding-left: 5px;
    }
    
    .sidebar-name a
    {
      display: block;
      height: 100%;
      text-decoration: none;
      color: inherit;
    }
    
    .sidebar-name:hover
    {
      background-color:#e1e2e5;
    }
    
    .sidebar-name img
    {
      width: 38px;
      height: 38px;
      vertical-align:middle;
    }
    
    .popup-box
    {
      display: none;
      position: fixed;
      bottom: 0px;
      right: 220px;
      height: 285px;
      background-color: rgb(237, 239, 244);
      width: 300px;  
    }
    
    .popup-box .popup-head
    {
      border-radius: 5px;
      background-color: #90d9aa;
      padding: 5px;
      color: black;
      font-weight: bold;
      font-size: 14px;
      clear: both;
    }
    
    .popup-box .popup-head .popup-head-left
    {
      float: left;
    }
    
    .popup-box .popup-head .popup-head-right
    {
      float: right;
      opacity: 0.5;
    }
    
    .popup-box .popup-head .popup-head-right a
    {
      text-decoration: none;
      color: inherit;
    }
    
    .popup-box .popup-messages
    {
      height: 93%;
      overflow-y: scroll;
    }
    
    footer.fixar-rodape{      
      box-shadow: 1px 1px 1px 1px (0,0,0,0.5);
      bottom: 0;
      left: 0;
      height: 40px;
      position: fixed;
      width: 100%;
      box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.2);
    }
    
  </style>
  
  
</head>
<body>      
  @section('navbar')
  <nav style="position:fixed; z-index:999; left:0%; right: 0%; top:0; width: 100%;" class="container-fixed navbar navbar-expand-lg  navbar-light bg-light nav-shadow">
    <h1 class="titulo-pt1">Get<strong class="titulo-pt2">YourDream</strong></h1>
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
            <div id="bg-inputs" style="position:absolute; z-index:999;" class="invalid-feedback ">
              {{ $errors->first('email') }}
            </div>
            @endif
          </div>
          <div class="col">
            <input  class="form-control mr-sm-2 inputs {{ $errors->has('email') ? 'is-invalid' : '' }}" name="senha" type="password" placeholder="Senha" aria-label="Senha">
            @if($errors->has('senha'))
            <div id="bg-inputs" style="position:absolute; z-index:999;" class="invalid-feedback ">
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
  <center style="margin-bottom: 50px; margin-top: 85px;">
    <div class="row" style="width: 100%;" >
      @if(session()->has('erroemail'))
      <div class="alert alert-danger">
        {{ session()->get('erroemail') }}
      </div>
      @endif
      <div class="col-md-6" style="width: 100%; height: 450px; border: 1px solid red;">

      </div> 
      <div class="col-md-6" style="width: 100%; height: 450px; border: 1px solid black;">

      </div> 
    </div>
    <div class="content">
      <form name="button-cadastro" method="GET" action="http://127.0.0.1:8000/cadastrese">    
        <div>
          <button type="submit" class="btn btn-success btn-cadastre-se">Cadastre-se</button>
        </div>
      </form>
    </div> 
  </center>
  @show  
  
  @section('footer')
  <footer class="bg-light fixar-rodape">
    <p style="padding-top: 10px;">&copy; <span class="titulo-pt1">Nome<strong class="titulo-pt2">DaRede</strong></span> todos os direitos reservados 2019</p>
  </footer> 
@show
<script> 
  $(document).ready(function(){
    $('#data').mask('00/00/0000');
    $('#cpf').mask('000000000-00'); 
    $('#rg').mask('00000000-00'); 
    $('#celular').mask('(00)00000-0000');
  });  

    /*Tentar implementar depois
    $('#abrirChat').click(function(id, id2){
      id
			$.post("/conversacao/", {
        id: id,
        id2: id2
			}, function(data, status){
				if(status=="success"){
          alert('Deu certo!');
          //$( "#Div-desligado" ).hide( "slow" );
					//$( "#Div-ligado" ).show( "slow" );
				}
			});
    });
    */


    //this function can remove a array element.
    Array.remove = function(array, from, to) {
      var rest = array.slice((to || from) + 1 || array.length);
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply(array, rest);
    };
    
    //this variable represents the total number of popups can be displayed according to the viewport width
    var total_popups = 0;
    
    //arrays of popups ids
    var popups = [];
    
    //this is used to close a popup
    function close_popup(id)
    {
      for(var iii = 0; iii < popups.length; iii++)
      {
        if(id == popups[iii])
        {
          Array.remove(popups, iii);
          
          document.getElementById(id).style.display = "none";
          
          calculate_popups();
          
          return;
        }
      }   
    }
    
    //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
    function display_popups()
    {
      var right = 220;
      
      var iii = 0;
      for(iii; iii < total_popups; iii++)
      {
        if(popups[iii] != undefined)
        {
          var element = document.getElementById(popups[iii]);
          element.style.right = right + "px";
          right = right + 320;
          element.style.display = "block";
        }
      }
      
      for(var jjj = iii; jjj < popups.length; jjj++)
      {
        var element = document.getElementById(popups[jjj]);
        element.style.display = "none";
      }
    }
    
    //creates markup for a new popup. Adds the id to popups array.
    function register_popup(id, name)
    {

      for(var iii = 0; iii < popups.length; iii++)
      {   
        //already registered. Bring it to front.
        if(id == popups[iii])
        {
          Array.remove(popups, iii);
          
          popups.unshift(id);
          
          calculate_popups();        
          
          return;
        }
      }               
      
      var element = '<div class="popup-box chat-popup" id="'+ id +'">';
      element = element + '<div class="popup-head">';
      element = element + '<div class="popup-head-left">'+ name +'</div>';
      element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ id +'\');">&#10005;</a></div>';
      element = element + '<div style="clear: both"></div></div><div class="popup-messages">'
      element = element + '<div>'
      element = element + '<textarea style="margin-top: 5px;" class="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>'      
      element = element + '</div>'         
      element = element + '<div style="" class="input-group mb-3">'
      element = element + '<input type="text" class="form-control" placeholder="Digite sua mensagem..." aria-label="" aria-describedby="basic-addon2">'
      element = element + '<div class="input-group-append">'
      element = element + '<button class="btn btn-outline-secondary" type="button">Enviar</button>'
      element = element + '</div>'
      element = element + '</div>'
      element = element + '</form> </div></div>';

      document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

      popups.unshift(id);

      calculate_popups();

    }

                //calculate the total number of popups suitable and then populate the toatal_popups variable.
                function calculate_popups()
                {
                  var width = window.innerWidth;
                  if(width < 540)
                  {
                    total_popups = 0;
                  }
                  else
                  {
                    width = width - 200;
                    //320 is width of a single popup box
                    total_popups = parseInt(width/320);
                  }
                  
                  display_popups();
                  
                }
                
                //recalculate when window is loaded and also when window is resized.
                window.addEventListener("resize", calculate_popups);
                window.addEventListener("load", calculate_popups);
                
              </script>
            </body>
            </html>
            