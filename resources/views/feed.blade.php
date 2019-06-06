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
                    <div class="" >
                        <img onclick="" style="width: 45px; height: 52px;" src="#" alt="Foto Perfil" class="rounded" style="border: 1px solid lightgray;">
                        <input hidden type="file" accept="image/*" name="fotoPerfil" id="perfilUpload">
                    </div>
                    <a class="dropdown-toggle btn" type="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> @foreach ($usuario as $u)
                        Bem vindo, {{ $u->nome }} @endforeach</a>
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
    <div style="margin-top: 80px;" class="container ">
        <div class="row">
            <div class="col-sm-2 border-right">
                <nav class="nav flex-column" style="padding-top: 20px;">
                    <span class="badge badge-default">Menu</span>
                    <div>
                        <a class="nav-link " href="#">Ver Perfil</a>
                        <a class="nav-link" href="#">Feed</a>
                        <a class="nav-link" href="#">Chat</a>
                        <a class="nav-link" href="#">Fotos</a>
                        <a class="nav-link" href="#">Amigos</a>
                        <a class="nav-link" href="#">Grupos</a>
                    </div>
                </nav>
            </div>
            <div class="col-md-7" style="padding-top: 15px;">
                <center>
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

                                    @foreach ($usuario as $u)
                                    <form name="formPost" id="formPost" method="POST" action="/feed/postar/{{$u->id}}" enctype="multipart/form-data">

                                        @endforeach
                                        <div class="modal-body">
                                            <div>
                                                @method('POST')
                                                @csrf
                                                <div>
                                                    <label for="#text-area">Digite seu post:</label>
                                                    <textarea id="text-area" class="form-control" type="text" name="post" rows="8" placeholder="Digite seu post..."></textarea>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <div class="custom-file">
                                                <input type="file" name="imagem" accept="image/*" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                                                <label class="custom-file-label" for="inputGroupFile01"><span class="glyphicon glyphicon-picture"></span></label>
                                            </div>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                            <button type="submit" class="btn btn-primary">Postar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    @if($errors->has('post'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{{ $errors->first('post') }}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    @endif
                    @if($errors->has('imagem'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{{ $errors->first('imagem') }}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    @endif
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

                    @foreach ($post as $p)
                    <div class="card text-center" style="margin-bottom: 10px;" style="height: 100px;">
                        <div class="card-header">
                            <span class="float-left">Postado Por: {{ $p->nome }}</span> <a class="float-right" href="/feed/deletar/{{ $p->id_post }}">X</a>
                        </div>
                        <div class="card-body container" style="height: 400px;">
                            <p class="card-text">{{ $p->post }}</p>
                            @if (isset($p->url_img))
                            <img class="img-fluid" style="width: 40%; height:100%;" src="{{asset('ImgPosts\\').$p->url_img}}" alt="...">
                            @endif
                        </div>
                        <div class="card-footer text-muted" style="margin-top: 25px;">
                            <span class="float-left">Postado em: {{ date( 'd/m/Y H:i' , strtotime($p->data_post)).' às: '.date( 'H:i' , strtotime($p->data_post))}}</span>
                        </div>
                    </div>
                    @endforeach
                    @foreach ($post_amigos as $pa)
                    <div class="card text-center" style="margin-bottom: 10px;">
                        <div class="card-header">
                            <span class="float-left">Postado Por: {{ $pa->nome }}</span> <a class="float-right" href="">X</a>
                        </div>
                        <div class="card-body">
                            <p class="card-text">{{ $pa->post }}</p>
                            @if ($pa->url_img)
                            <img style="width: 100%; height: 100%;" src="{{asset('ImgPosts\\').$pa->url_img}}" alt="..." class="rounded">
                            @endif
                        </div>
                        <div class="card-footer text-muted">
                            <span class="float-left">
                                Postado em: {{ date( 'd/m/Y H:i' , strtotime($pa->data_post))
                                .' às: '.date( 'H:i' , strtotime($pa->data_post))}}
                            </span>
                            <div class="float-right">
                                <a href="#">Curtir</a>
                                <span>|</span>
                                <a href="#">Comentar</a>
                                <span>|</span>
                                <a href="#">Compartilhar</a>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </center>
            </div>
            <div class="col-sm-3" >
                <div class="chat-sidebar rounded" style="margin-top: 80px;">
                    <center><p>Chat</p></center>
                    @if ($amigos == null)
                    <center><p>Você ainda não tem amigos, pesquise pessoas conhecidas!</p></center>
                    @else

                    @foreach ($amigos as $a)
                    <div class="sidebar-name">
                        <a id="abrirChat" onclick="javascript:register_popup('{{$a->id}}','{{$a->nome}}');">
                            <img class="rounded-circle img-responsive" width="30" height="30" src="{{asset('usu/foto.jpeg')}}" />
                            <span>{{$a->nome}}</span>
                        </a>
                    </div>
                    @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>


    @endsection

    @section('footer')
    @endsection
