@extends('templates.templatebasico')


@section('formlogin')
<form name="form-button" method="get" action="http://127.0.0.1:8000">
	<button class="btn btn-outline-info" type="submit">Voltar</button>
</form>
@endsection

@section('body')



<div style="margin-top: 90px;" class="container-fluid ">
	<div class="row">
		<div  class="container col-md-8" style="margin-left: 20px;">			   	
			<form  id="form-usu" name="form-usu" method="POST" action="cadastrese/salvar" style="margin-top: 10px;">					
				@method('PUT')
				@csrf
				
				@if(session()->has('successo'))
				<div class="alert alert-success">
					{{ session()->get('successo') }}
				</div>
				@endif


				<div class="row">
					<div class="col-md-4">
						<label>Insira o Nome completo</label>
					</div>

					<div class="col">
						<input  name="nome" class="form-control mr-sm-2 inputs {{ $errors->has('nome') ? 'is-invalid' : '' }}" type="text" placeholder="Nome" aria-label="Nome">
						@if($errors->has('nome'))
						<div class="invalid-feedback">
							{{ $errors->first('nome') }}
						</div>
						@endif
					</div>

				</div>

				<div class="row">
					<div class="col-md-4" >
						<label>Insira o E-mail</label>
					</div>					
					<div class="col" style="margin-top: 5px;">
						<input  name="email" class="form-control mr-sm-2 inputs {{ $errors->has('nome') ? 'is-invalid' : '' }}" type="text" placeholder="E-mail" aria-label="E-mail">
						@if($errors->has('email'))
						<div class="invalid-feedback">
							{{ $errors->first('email') }}
						</div>
						@endif
					</div>	
				</div>

				<div class="row">
					<div class="col-md-4" >
						<label>Insira a Senha</label>
					</div>					
					<div class="col" style="margin-top: 5px;">
						<input maxlength="8"  name="senha" class="form-control mr-sm-2 inputs {{ $errors->has('senha') ? 'is-invalid' : '' }}" type="password" placeholder="Senha" aria-label="Senha">

						@if(session()->has('senhaerrada'))
						<div class="alert alert-danger">
							{{ session()->get('senhaerrada') }}
						</div>
						@endif

						@if($errors->has('senha'))
						<div class="invalid-feedback">
							{{ $errors->first('senha') }}
						</div>
						@endif
					</div>	
				</div>

				<div class="row">
					<div class="col-md-4" >
						<label>Repita a Senha</label>
					</div>					
					<div class="col" style="margin-top: 5px;">
						<input maxlength="8"  name="senha1" class="form-control mr-sm-2 inputs {{ $errors->has('senha') ? 'is-invalid' : '' }}" type="password" placeholder="Senha" aria-label="Senha">					

						@if($errors->has('senha'))
						<div class="invalid-feedback">
							{{ $errors->first('senha') }}
						</div>
						@endif
					</div>	
				</div>

				<div class="row">
					<div class="col-md-4">
						<label>Insira o Endereço</label>
					</div>

					<div class="col" style="margin-top: 5px;">
						<input  name="endereco" class="form-control mr-sm-2 inputs {{ $errors->has('endereco') ? 'is-invalid' : '' }}" type="text" placeholder="Endereço" aria-label="Endereco">
						@if($errors->has('endereco'))
						<div class="invalid-feedback">
							{{ $errors->first('endereco') }}
						</div>
						@endif
					</div>
				</div>			

				<div class="row">
					<div class="col-md-5">
						<label>Insira o Número do Celular</label>
					</div>

					<div class="col" style="margin-top: 5px;">
						<input maxlength="12" id="celular"  name="celular" class="form-control mr-sm-2 inputs {{ $errors->has('celular') ? 'is-invalid' : '' }}" type="text" placeholder="Celular" aria-label="Celular">
						@if($errors->has('celular'))
						<div class="invalid-feedback">
							{{ $errors->first('celular') }}
						</div>
						@endif				
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<label>Insira a Data de Nascimento</label>
					</div>

					<div class="col" style="margin-top: 5px;">
						<input id="data" maxlength="10" id="data-nasc"  name="data_nasc" class="form-control mr-sm-2 inputs {{ $errors->has('data_nasc') ? 'is-invalid' : '' }}" type="text" placeholder="Data de nascimento" aria-label="Celular">
						@if($errors->has('data_nasc'))
						<div class="invalid-feedback">
							{{ $errors->first('data_nasc') }}
						</div>
						@endif
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<label>Insira o Número do RG</label>
					</div>

					<div class="col" style="margin-top: 5px;">
						<input maxlength="11" id="rg" name="rg" class="form-control mr-sm-2 inputs {{ $errors->has('rg') ? 'is-invalid' : '' }}" type="text" placeholder="RG" aria-label="RG">
						@if($errors->has('rg'))
						<div class="invalid-feedback">
							{{ $errors->first('rg') }}
						</div>
						@endif
					</div>					
				</div>

				<div class="row">
					<div class="col-md-4">
						<label>Insira o Número do CPF</label>
					</div>

					<div class="col" style="margin-top: 5px;">
						<input id="cpf" maxlength="12"  name="cpf" class="form-control mr-sm-2 inputs {{ $errors->has('cpf') ? 'is-invalid' : '' }}" type="text" placeholder="CPF" aria-label="CPF">
						@if($errors->has('cpf'))
						<div class="invalid-feedback">
							{{ $errors->first('cpf') }}
						</div>
						@endif
					</div>				
				</div>

				<div class="row" style="margin-top: 5px;">
					<div class="col ">
						<label><input  value="1" type="radio" name="optradio">Sonhador</label>
					</div>

					<div class="col">
						<label><input value="2" type="radio" name="optradio">Influenciador</label>
					</div>
				</div>

				@if($errors->has('optradio'))				
				<div class="alert alert-danger row col-md-6" role="alert">
					{{ $errors->first('optradio') }}					</div>

					@endif
					<div class="row" style="margin-bottom: 100px;">
						<button type="submit" class="btn btn-success btn-cadastre-se">Cadastrar</button>
					</div>

				</form>
			</div>
		</div>
	</div>
	@endsection

	@section('footer')
	@parent
	@endsection