@extends('templates.templatebasico')


@section('formlogin')
<div class="container">
    <center>
        <form>
            <div class="input-group mb-3 col-sm-8 rounded">
                <input type="text" class="form-control" placeholder="Pesquise por nome de pessoas ou grupos" aria-label="Example text with button addon" aria-describedby="button-ddon1">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary rounded" type="button" id="button-addon1">Buscar</button>
                </div>
            </div>
        </form>
    </center>
</div>
<div>
    <center>
        <div class="row">        
            <div class="input-group col">
                <div class="input-group-append">
                    <a class="dropdown-toggle btn" type="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bem vindo, {{$usuario->nome}}</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item " href="#">Editar Perfil</a>                  
                        <a class="dropdown-item" href="/">Sair</a>
                    </div>
                </div>
            </div>
        </div>
    </center>
</div>  
@endsection

@section('body')
<div style="margin-top: 100px;" class="container-fluid">
    <div class="row">
        <div style="" class="col-md-2 container-fluid" >

            <nav class="nav flex-column rounded" style="border: 1px solid lightgrey; position: fixed;">
                <span class="badge badge-default">Menu</span>
                <a class="nav-link " href="#">Ver Perfil</a>
                <a class="nav-link" href="#">Feed</a>
                <a class="nav-link" href="#">Chat</a>
                <a class="nav-link" href="#">Fotos</a>
                <a class="nav-link" href="#">Amigos</a>
                <a class="nav-link" href="#">Grupos</a> 
            </nav>
        </div>        
        <div class="col">

           <span class="badge badge-default">Feed</span>
           <div>

            <button style="margin-bottom: 10px;" type="button" data-toggle="modal" data-target="#modalPost" class="btn btn-outline-success justify-content-middle">
                Nova Postagem
            </button>                  

            <!-- Modal -->
            <div class="modal fade" id="modalPost" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Novo Post</h5>

                    </div>
                    <form name="formPost" id="formPost" method="POST" action="/feed/postar/{{$usuario->id}}">
                        <div class="modal-body">                            
                            <div>
                                @csrf
                                <div>
                                    <label>Digite seu post:
                                        <input class="form-control" type="text" name="post" placeholder="Digite seu post, desabafe..." >
                                    </label>
                                </div>
                            </div>   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Postar</button>
                        </div>
                    </form>  
                </div>
            </div>
        </div>

    </div>
    
    @if(session()->has('postado'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{{ session()->get('postado') }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif

    @if(session()->has('deletado'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{{ session()->get('deletado') }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif

    @foreach ($posts as $p)
    <div style="margin-bottom: 10px;" class="card">

        <p class="card-header">Postado por: {{$usuario->nome}}<a class="float-right"  href="/feed/deletar/{{$p->id}}">Apagar Post</a></p>  
        <div class="card-body">
            <p class="card-text">{{$p->post}}</p>
        </div>
        <div class="card-footer">
            Postado em: {{ \Carbon\Carbon::parse($p->data_post)->format('d-m-Y') }} às: {{\Carbon\Carbon::parse($p->data_post)->format('H:m') }}
        </div>
    </div>     
    @endforeach
</div>
<div class="col-md-3" >

    <div>
        <ul class="list-group bordered" style="position: fixed;">
            <span class="badge badge-default">Amigos Online</span>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="" style="padding-right: 10px;">Nome do Amigo</a>
                <span class="badge badge-primary badge-pill">Qtd. de msg n lidas</span>
            </li>        
        </ul>
    </div>
</div>
</div>
</div>

@endsection

@section('footer')
@endsection