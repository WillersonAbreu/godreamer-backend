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
<h1>Deu certo a conversa!!!</h1> 
<div>
    <center>
        <div class="row">        
            <div class="input-group col">
                <div class="input-group-append">
                    <div class="" >
                        <img onclick="" style="width: 45px; height: 52px;" src="{{asset('usu/foto.jpeg')}}" alt="..." class="rounded">
                        <input hidden type="file" accept="image/*" name="fotoPerfil" id="perfilUpload">
                    </div>
                    <a class="dropdown-toggle btn" type="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                        
                        Bem vindo, 
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
           
    @endsection
    
    @section('footer')
    @endsection