<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>GetYourDream
  </title>
  <link rel="shortcut icon" href="{{asset('img/logo.png')}}" >
  <!-- Bootstrap -->
  <link rel="stylesheet" href="{{asset('css/app.css')}}" crossorigin="anonymous">  
  <script src="{{asset('js/app.js')}}" type="text/javascript" crossorigin="anonymous"></script>
  <script src="{{asset('js/jquery.mask.min.js')}}" type="text/javascript" crossorigin="anonymous"></script>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
  
  
  
  <!-- Styles -->
  <style>
    @font-face{font-family:'Glyphicons Halflings';src:url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot');src:url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff') format('woff'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.ttf') format('truetype'),url('https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.svg#glyphicons-halflingsregular') format('svg');}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:normal;line-height:1;-webkit-font-smoothing:antialiased;}
    .glyphicon-asterisk:before{content:"\2a";}
    .glyphicon-plus:before{content:"\2b";}
    .glyphicon-euro:before{content:"\20ac";}
    .glyphicon-minus:before{content:"\2212";}
    .glyphicon-cloud:before{content:"\2601";}
    .glyphicon-envelope:before{content:"\2709";}
    .glyphicon-pencil:before{content:"\270f";}
    .glyphicon-glass:before{content:"\e001";}
    .glyphicon-music:before{content:"\e002";}
    .glyphicon-search:before{content:"\e003";}
    .glyphicon-heart:before{content:"\e005";}
    .glyphicon-star:before{content:"\e006";}
    .glyphicon-star-empty:before{content:"\e007";}
    .glyphicon-user:before{content:"\e008";}
    .glyphicon-film:before{content:"\e009";}
    .glyphicon-th-large:before{content:"\e010";}
    .glyphicon-th:before{content:"\e011";}
    .glyphicon-th-list:before{content:"\e012";}
    .glyphicon-ok:before{content:"\e013";}
    .glyphicon-remove:before{content:"\e014";}
    .glyphicon-zoom-in:before{content:"\e015";}
    .glyphicon-zoom-out:before{content:"\e016";}
    .glyphicon-off:before{content:"\e017";}
    .glyphicon-signal:before{content:"\e018";}
    .glyphicon-cog:before{content:"\e019";}
    .glyphicon-trash:before{content:"\e020";}
    .glyphicon-home:before{content:"\e021";}
    .glyphicon-file:before{content:"\e022";}
    .glyphicon-time:before{content:"\e023";}
    .glyphicon-road:before{content:"\e024";}
    .glyphicon-download-alt:before{content:"\e025";}
    .glyphicon-download:before{content:"\e026";}
    .glyphicon-upload:before{content:"\e027";}
    .glyphicon-inbox:before{content:"\e028";}
    .glyphicon-play-circle:before{content:"\e029";}
    .glyphicon-repeat:before{content:"\e030";}
    .glyphicon-refresh:before{content:"\e031";}
    .glyphicon-list-alt:before{content:"\e032";}
    .glyphicon-flag:before{content:"\e034";}
    .glyphicon-headphones:before{content:"\e035";}
    .glyphicon-volume-off:before{content:"\e036";}
    .glyphicon-volume-down:before{content:"\e037";}
    .glyphicon-volume-up:before{content:"\e038";}
    .glyphicon-qrcode:before{content:"\e039";}
    .glyphicon-barcode:before{content:"\e040";}
    .glyphicon-tag:before{content:"\e041";}
    .glyphicon-tags:before{content:"\e042";}
    .glyphicon-book:before{content:"\e043";}
    .glyphicon-print:before{content:"\e045";}
    .glyphicon-font:before{content:"\e047";}
    .glyphicon-bold:before{content:"\e048";}
    .glyphicon-italic:before{content:"\e049";}
    .glyphicon-text-height:before{content:"\e050";}
    .glyphicon-text-width:before{content:"\e051";}
    .glyphicon-align-left:before{content:"\e052";}
    .glyphicon-align-center:before{content:"\e053";}
    .glyphicon-align-right:before{content:"\e054";}
    .glyphicon-align-justify:before{content:"\e055";}
    .glyphicon-list:before{content:"\e056";}
    .glyphicon-indent-left:before{content:"\e057";}
    .glyphicon-indent-right:before{content:"\e058";}
    .glyphicon-facetime-video:before{content:"\e059";}
    .glyphicon-picture:before{content:"\e060";}
    .glyphicon-map-marker:before{content:"\e062";}
    .glyphicon-adjust:before{content:"\e063";}
    .glyphicon-tint:before{content:"\e064";}
    .glyphicon-edit:before{content:"\e065";}
    .glyphicon-share:before{content:"\e066";}
    .glyphicon-check:before{content:"\e067";}
    .glyphicon-move:before{content:"\e068";}
    .glyphicon-step-backward:before{content:"\e069";}
    .glyphicon-fast-backward:before{content:"\e070";}
    .glyphicon-backward:before{content:"\e071";}
    .glyphicon-play:before{content:"\e072";}
    .glyphicon-pause:before{content:"\e073";}
    .glyphicon-stop:before{content:"\e074";}
    .glyphicon-forward:before{content:"\e075";}
    .glyphicon-fast-forward:before{content:"\e076";}
    .glyphicon-step-forward:before{content:"\e077";}
    .glyphicon-eject:before{content:"\e078";}
    .glyphicon-chevron-left:before{content:"\e079";}
    .glyphicon-chevron-right:before{content:"\e080";}
    .glyphicon-plus-sign:before{content:"\e081";}
    .glyphicon-minus-sign:before{content:"\e082";}
    .glyphicon-remove-sign:before{content:"\e083";}
    .glyphicon-ok-sign:before{content:"\e084";}
    .glyphicon-question-sign:before{content:"\e085";}
    .glyphicon-info-sign:before{content:"\e086";}
    .glyphicon-screenshot:before{content:"\e087";}
    .glyphicon-remove-circle:before{content:"\e088";}
    .glyphicon-ok-circle:before{content:"\e089";}
    .glyphicon-ban-circle:before{content:"\e090";}
    .glyphicon-arrow-left:before{content:"\e091";}
    .glyphicon-arrow-right:before{content:"\e092";}
    .glyphicon-arrow-up:before{content:"\e093";}
    .glyphicon-arrow-down:before{content:"\e094";}
    .glyphicon-share-alt:before{content:"\e095";}
    .glyphicon-resize-full:before{content:"\e096";}
    .glyphicon-resize-small:before{content:"\e097";}
    .glyphicon-exclamation-sign:before{content:"\e101";}
    .glyphicon-gift:before{content:"\e102";}
    .glyphicon-leaf:before{content:"\e103";}
    .glyphicon-eye-open:before{content:"\e105";}
    .glyphicon-eye-close:before{content:"\e106";}
    .glyphicon-warning-sign:before{content:"\e107";}
    .glyphicon-plane:before{content:"\e108";}
    .glyphicon-random:before{content:"\e110";}
    .glyphicon-comment:before{content:"\e111";}
    .glyphicon-magnet:before{content:"\e112";}
    .glyphicon-chevron-up:before{content:"\e113";}
    .glyphicon-chevron-down:before{content:"\e114";}
    .glyphicon-retweet:before{content:"\e115";}
    .glyphicon-shopping-cart:before{content:"\e116";}
    .glyphicon-folder-close:before{content:"\e117";}
    .glyphicon-folder-open:before{content:"\e118";}
    .glyphicon-resize-vertical:before{content:"\e119";}
    .glyphicon-resize-horizontal:before{content:"\e120";}
    .glyphicon-hdd:before{content:"\e121";}
    .glyphicon-bullhorn:before{content:"\e122";}
    .glyphicon-certificate:before{content:"\e124";}
    .glyphicon-thumbs-up:before{content:"\e125";}
    .glyphicon-thumbs-down:before{content:"\e126";}
    .glyphicon-hand-right:before{content:"\e127";}
    .glyphicon-hand-left:before{content:"\e128";}
    .glyphicon-hand-up:before{content:"\e129";}
    .glyphicon-hand-down:before{content:"\e130";}
    .glyphicon-circle-arrow-right:before{content:"\e131";}
    .glyphicon-circle-arrow-left:before{content:"\e132";}
    .glyphicon-circle-arrow-up:before{content:"\e133";}
    .glyphicon-circle-arrow-down:before{content:"\e134";}
    .glyphicon-globe:before{content:"\e135";}
    .glyphicon-tasks:before{content:"\e137";}
    .glyphicon-filter:before{content:"\e138";}
    .glyphicon-fullscreen:before{content:"\e140";}
    .glyphicon-dashboard:before{content:"\e141";}
    .glyphicon-heart-empty:before{content:"\e143";}
    .glyphicon-link:before{content:"\e144";}
    .glyphicon-phone:before{content:"\e145";}
    .glyphicon-usd:before{content:"\e148";}
    .glyphicon-gbp:before{content:"\e149";}
    .glyphicon-sort:before{content:"\e150";}
    .glyphicon-sort-by-alphabet:before{content:"\e151";}
    .glyphicon-sort-by-alphabet-alt:before{content:"\e152";}
    .glyphicon-sort-by-order:before{content:"\e153";}
    .glyphicon-sort-by-order-alt:before{content:"\e154";}
    .glyphicon-sort-by-attributes:before{content:"\e155";}
    .glyphicon-sort-by-attributes-alt:before{content:"\e156";}
    .glyphicon-unchecked:before{content:"\e157";}
    .glyphicon-expand:before{content:"\e158";}
    .glyphicon-collapse-down:before{content:"\e159";}
    .glyphicon-collapse-up:before{content:"\e160";}
    .glyphicon-log-in:before{content:"\e161";}
    .glyphicon-flash:before{content:"\e162";}
    .glyphicon-log-out:before{content:"\e163";}
    .glyphicon-new-window:before{content:"\e164";}
    .glyphicon-record:before{content:"\e165";}
    .glyphicon-save:before{content:"\e166";}
    .glyphicon-open:before{content:"\e167";}
    .glyphicon-saved:before{content:"\e168";}
    .glyphicon-import:before{content:"\e169";}
    .glyphicon-export:before{content:"\e170";}
    .glyphicon-send:before{content:"\e171";}
    .glyphicon-floppy-disk:before{content:"\e172";}
    .glyphicon-floppy-saved:before{content:"\e173";}
    .glyphicon-floppy-remove:before{content:"\e174";}
    .glyphicon-floppy-save:before{content:"\e175";}
    .glyphicon-floppy-open:before{content:"\e176";}
    .glyphicon-credit-card:before{content:"\e177";}
    .glyphicon-transfer:before{content:"\e178";}
    .glyphicon-cutlery:before{content:"\e179";}
    .glyphicon-header:before{content:"\e180";}
    .glyphicon-compressed:before{content:"\e181";}
    .glyphicon-earphone:before{content:"\e182";}
    .glyphicon-phone-alt:before{content:"\e183";}
    .glyphicon-tower:before{content:"\e184";}
    .glyphicon-stats:before{content:"\e185";}
    .glyphicon-sd-video:before{content:"\e186";}
    .glyphicon-hd-video:before{content:"\e187";}
    .glyphicon-subtitles:before{content:"\e188";}
    .glyphicon-sound-stereo:before{content:"\e189";}
    .glyphicon-sound-dolby:before{content:"\e190";}
    .glyphicon-sound-5-1:before{content:"\e191";}
    .glyphicon-sound-6-1:before{content:"\e192";}
    .glyphicon-sound-7-1:before{content:"\e193";}
    .glyphicon-copyright-mark:before{content:"\e194";}
    .glyphicon-registration-mark:before{content:"\e195";}
    .glyphicon-cloud-download:before{content:"\e197";}
    .glyphicon-cloud-upload:before{content:"\e198";}
    .glyphicon-tree-conifer:before{content:"\e199";}
    .glyphicon-tree-deciduous:before{content:"\e200";}
    .glyphicon-briefcase:before{content:"\1f4bc";}
    .glyphicon-calendar:before{content:"\1f4c5";}
    .glyphicon-pushpin:before{content:"\1f4cc";}
    .glyphicon-paperclip:before{content:"\1f4ce";}
    .glyphicon-camera:before{content:"\1f4f7";}
    .glyphicon-lock:before{content:"\1f512";}
    .glyphicon-bell:before{content:"\1f514";}
    .glyphicon-bookmark:before{content:"\1f516";}
    .glyphicon-fire:before{content:"\1f525";}
    .glyphicon-wrench:before{content:"\1f527";}
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
    
    
  </style>
  
  
</head>
<body>      
  @section('navbar')
  <nav style="position:fixed; z-index:999; left:0%; right: 0%; top:0; " class="container-fixed navbar navbar-expand-lg  navbar-light bg-light nav-shadow">
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
        <span class="titulo-pt1">Nome<strong class="titulo-pt2">DaRede</strong></span> todos os direitos reservados 2019 
      </div>     
    </nav>
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
            